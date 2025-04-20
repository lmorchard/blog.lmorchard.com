#!/bin/bash
BASE_DIR=$*

for fn in $BASE_DIR/*.jp?g; do
    echo $fn;
    convert $fn -auto-orient -quality 75 -strip -resize 1400\> $fn;
done

for fn in $BASE_DIR/*.png; do
    echo $fn;
    convert $fn -strip -resize 1400\> $fn;
    pngquant $fn --ext .png --force; 
done
