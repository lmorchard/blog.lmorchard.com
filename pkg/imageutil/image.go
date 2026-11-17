package imageutil

import (
	"fmt"
	"image"
	"image/color"
	"image/color/palette"
	"image/draw"
	_ "image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"math"
	"os"
	"path/filepath"
	"strings"

	xdraw "golang.org/x/image/draw"
)

type DitherOptions struct {
	MaxWidth  int
	Downscale float64
	Upscale   float64
	NumColors int
	LoFi      bool
}

var DefaultDitherOptions = DitherOptions{
	MaxWidth:  1024,
	Downscale: 0.33,
	Upscale:   3.0,
	NumColors: 32,
	LoFi:      false,
}

// DitherImage applies retro downscaling, Floyd-Steinberg color quantization,
// and nearest-neighbor upscaling to produce a classic dithered aesthetic.
func DitherImage(srcPath, destPath string, opts DitherOptions) error {
	if opts.MaxWidth <= 0 {
		opts.MaxWidth = DefaultDitherOptions.MaxWidth
	}
	if opts.Downscale <= 0 {
		opts.Downscale = DefaultDitherOptions.Downscale
	}
	if opts.Upscale <= 0 {
		opts.Upscale = DefaultDitherOptions.Upscale
	}
	if opts.NumColors <= 0 {
		opts.NumColors = DefaultDitherOptions.NumColors
	}
	if opts.LoFi {
		opts.Downscale *= 0.5
		opts.NumColors = int(math.Max(2, float64(opts.NumColors/2)))
	}

	inFile, err := os.Open(srcPath)
	if err != nil {
		return err
	}
	defer inFile.Close()

	srcImg, _, err := image.Decode(inFile)
	if err != nil {
		return fmt.Errorf("failed to decode image %s: %w", srcPath, err)
	}

	b := srcImg.Bounds()
	width := b.Dx()
	height := b.Dy()

	startW := width
	startH := height
	if width > opts.MaxWidth {
		startW = opts.MaxWidth
		startH = int(math.Round(float64(height*opts.MaxWidth) / float64(width)))
	}

	// 1. Constrain to startW / startH if downscaling initial image
	var baseImg image.Image = srcImg
	if startW != width || startH != height {
		constrained := image.NewRGBA(image.Rect(0, 0, startW, startH))
		xdraw.CatmullRom.Scale(constrained, constrained.Bounds(), srcImg, srcImg.Bounds(), xdraw.Over, nil)
		baseImg = constrained
	}

	// 2. Downscale
	intermediateW := int(math.Round(float64(startW) * opts.Downscale))
	intermediateH := int(math.Round(float64(startH) * opts.Downscale))
	if intermediateW < 1 {
		intermediateW = 1
	}
	if intermediateH < 1 {
		intermediateH = 1
	}

	downscaled := image.NewRGBA(image.Rect(0, 0, intermediateW, intermediateH))
	xdraw.CatmullRom.Scale(downscaled, downscaled.Bounds(), baseImg, baseImg.Bounds(), xdraw.Over, nil)

	// 3. Create color palette & apply Floyd-Steinberg dithering
	pal := generatePalette(opts.NumColors)
	paletted := image.NewPaletted(downscaled.Bounds(), pal)
	draw.FloydSteinberg.Draw(paletted, paletted.Bounds(), downscaled, image.Point{})

	// 4. Upscale using Nearest-Neighbor to preserve pixelated aesthetic
	finalW := int(math.Round(float64(intermediateW) * opts.Upscale))
	finalH := int(math.Round(float64(intermediateH) * opts.Upscale))
	if finalW < 1 {
		finalW = 1
	}
	if finalH < 1 {
		finalH = 1
	}

	upscaled := image.NewRGBA(image.Rect(0, 0, finalW, finalH))
	xdraw.NearestNeighbor.Scale(upscaled, upscaled.Bounds(), paletted, paletted.Bounds(), xdraw.Over, nil)

	// 5. Write to destination PNG
	_ = os.MkdirAll(filepath.Dir(destPath), 0755)
	outFile, err := os.Create(destPath)
	if err != nil {
		return err
	}
	defer outFile.Close()

	encoder := png.Encoder{
		CompressionLevel: png.BestCompression,
	}
	return encoder.Encode(outFile, upscaled)
}

// OptimizeImage resizes images exceeding maxDim and recompresses JPEG/PNG.
func OptimizeImage(srcPath, destPath string, maxDim int, jpegQuality int) error {
	if maxDim <= 0 {
		maxDim = 1400
	}
	if jpegQuality <= 0 {
		jpegQuality = 75
	}

	inFile, err := os.Open(srcPath)
	if err != nil {
		return err
	}
	defer inFile.Close()

	srcImg, format, err := image.Decode(inFile)
	if err != nil {
		// Non-image or unsupported, just copy raw
		inFile.Seek(0, io.SeekStart)
		return copyRawFile(inFile, destPath)
	}

	b := srcImg.Bounds()
	w := b.Dx()
	h := b.Dy()

	targetW := w
	targetH := h

	if w > maxDim || h > maxDim {
		if w >= h {
			targetW = maxDim
			targetH = int(math.Round(float64(h*maxDim) / float64(w)))
		} else {
			targetH = maxDim
			targetW = int(math.Round(float64(w*maxDim) / float64(h)))
		}
	}

	var finalImg image.Image = srcImg
	if targetW != w || targetH != h {
		dst := image.NewRGBA(image.Rect(0, 0, targetW, targetH))
		xdraw.CatmullRom.Scale(dst, dst.Bounds(), srcImg, srcImg.Bounds(), xdraw.Over, nil)
		finalImg = dst
	}

	_ = os.MkdirAll(filepath.Dir(destPath), 0755)
	outFile, err := os.Create(destPath)
	if err != nil {
		return err
	}
	defer outFile.Close()

	ext := strings.ToLower(filepath.Ext(srcPath))
	switch {
	case format == "jpeg" || ext == ".jpg" || ext == ".jpeg":
		return jpeg.Encode(outFile, finalImg, &jpeg.Options{Quality: jpegQuality})
	case format == "png" || ext == ".png":
		enc := png.Encoder{CompressionLevel: png.BestCompression}
		return enc.Encode(outFile, finalImg)
	default:
		// Fallback to PNG
		return png.Encode(outFile, finalImg)
	}
}

func copyRawFile(r io.Reader, destPath string) error {
	_ = os.MkdirAll(filepath.Dir(destPath), 0755)
	out, err := os.Create(destPath)
	if err != nil {
		return err
	}
	defer out.Close()
	_, err = io.Copy(out, r)
	return err
}

// generatePalette generates a color palette of the requested size.
func generatePalette(numColors int) color.Palette {
	if numColors >= 256 {
		return palette.Plan9
	}
	if numColors <= 16 {
		return palette.Plan9[:16]
	}

	// Sample evenly from Plan9 retro palette
	step := float64(len(palette.Plan9)) / float64(numColors)
	var pal color.Palette
	for i := 0; i < numColors; i++ {
		idx := int(float64(i) * step)
		if idx >= len(palette.Plan9) {
			idx = len(palette.Plan9) - 1
		}
		pal = append(pal, palette.Plan9[idx])
	}
	return pal
}
