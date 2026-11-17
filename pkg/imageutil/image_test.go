package imageutil

import (
	"image"
	"image/color"
	"image/png"
	"os"
	"path/filepath"
	"testing"
)

func TestDitherAndOptimizeImage(t *testing.T) {
	tmpDir := t.TempDir()
	srcFile := filepath.Join(tmpDir, "test.png")
	ditherFile := filepath.Join(tmpDir, "test-dithered.png")
	optFile := filepath.Join(tmpDir, "test-opt.png")

	// Create test 200x200 image
	img := image.NewRGBA(image.Rect(0, 0, 200, 200))
	for y := 0; y < 200; y++ {
		for x := 0; x < 200; x++ {
			img.Set(x, y, color.RGBA{
				R: uint8((x * 255) / 200),
				G: uint8((y * 255) / 200),
				B: uint8(((x + y) * 255) / 400),
				A: 255,
			})
		}
	}

	f, err := os.Create(srcFile)
	if err != nil {
		t.Fatalf("failed to create src file: %v", err)
	}
	if err := png.Encode(f, img); err != nil {
		t.Fatalf("failed to encode src png: %v", err)
	}
	f.Close()

	// 1. Test Dither
	err = DitherImage(srcFile, ditherFile, DitherOptions{
		Downscale: 0.5,
		Upscale:   2.0,
		NumColors: 16,
	})
	if err != nil {
		t.Fatalf("DitherImage failed: %v", err)
	}

	ditheredInfo, err := os.Stat(ditherFile)
	if err != nil || ditheredInfo.Size() == 0 {
		t.Fatalf("dither output missing or empty")
	}

	// 2. Test Optimize
	err = OptimizeImage(srcFile, optFile, 100, 75)
	if err != nil {
		t.Fatalf("OptimizeImage failed: %v", err)
	}

	optInfo, err := os.Stat(optFile)
	if err != nil || optInfo.Size() == 0 {
		t.Fatalf("optimize output missing or empty")
	}

	// Verify optimized dimensions
	optF, _ := os.Open(optFile)
	defer optF.Close()
	optDecoded, _, err := image.Decode(optF)
	if err != nil {
		t.Fatalf("failed to decode optimized image: %v", err)
	}
	if optDecoded.Bounds().Dx() > 100 || optDecoded.Bounds().Dy() > 100 {
		t.Errorf("expected max dim 100, got %dx%d", optDecoded.Bounds().Dx(), optDecoded.Bounds().Dy())
	}
}
