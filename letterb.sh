#!/bin/bash
baseName="${1%.lt}"
npx ts-node ./letter.ts -f "${baseName}.lt" -i && clang "${baseName}.ll" -c -o "${baseName}.o"