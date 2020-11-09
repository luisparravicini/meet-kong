#!/bin/sh

dir=`dirname "$0"`
fname=meet_kong.zip

cd "$dir"

[ -f "$fname" ] && rm "$fname"
zip -r "$fname" css/ fonts/ js/ index.html -x '*.DS_Store'

