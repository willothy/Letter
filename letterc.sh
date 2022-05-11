#!/bin/bash
baseName="${1%.lt}"
npx ts-node ./letter.ts -f "${baseName}.lt" -i && clang "${baseName}.ll" -o "${baseName}"