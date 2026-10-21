#!/bin/bash
# usage: ./still.sh comp frame...
S=/private/tmp/claude-501/-Users-renatoshira-Projects-renatoshira-github-io/ef33ce15-94bd-4ca1-99f8-9012af192510/scratchpad/mv
cd "$(dirname "$0")"
npx remotion bundle src/index.ts --out-dir=build --log=error || exit 1
c=$1; shift
for fr in "$@"; do npx remotion still build $c $S/${c}_$fr.png --frame=$fr --port=3917 --log=error; done
