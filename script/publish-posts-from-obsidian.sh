#!/usr/bin/env bash

git pull --rebase --autostash
cp -r ../obsidian/main/blog/daily/* ./content/posts/
git add .
git commit -m"publish from obsidian at `date '+%Y-%m-%d %H:%M:%S'`"
git push
