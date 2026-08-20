#!/usr/bin/env bash
set -euo pipefail

npx next build

output_dir="netlify-static"
rm -rf "$output_dir"
mkdir -p "$output_dir/_next"
cp -R public/. "$output_dir/"
cp -R .next/static "$output_dir/_next/static"

while IFS= read -r source; do
  relative="${source#.next/server/app/}"
  if [ "$relative" = "index.html" ]; then
    destination="$output_dir/index.html"
  else
    route="${relative%.html}"
    destination="$output_dir/$route/index.html"
  fi
  mkdir -p "$(dirname "$destination")"
  cp "$source" "$destination"
done < <(find .next/server/app -type f -name '*.html' | sort)

printf 'Prepared NFCPlate static storefront in %s\n' "$output_dir"
