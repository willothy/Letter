#!/bin/bash
baseName="${1%.lt}"
node ./letter-rdp -f "${baseName}.lt" -i > "${baseName}.ll"
clang "${baseName}.ll" -o "${baseName}"