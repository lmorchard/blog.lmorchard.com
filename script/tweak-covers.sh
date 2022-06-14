#!/bin/bash

for fn in ./posts/**/cover-orig.png; do
    new_fn=${fn/cover-orig/cover};
    echo $new_fn;
    convert $fn -scale 33% -dither Riemersma -colors 32 -scale 300% $new_fn;
done

