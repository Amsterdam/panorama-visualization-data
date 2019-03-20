#!/usr/bin/env bash

# # MBUtil is an old Mapbox tool to extract tiles from mbtiles databases:
# #   https://github.com/mapbox/mbutil
# # (There might be newer and better solutions, but I couldn't find one)
# # However, it works, and people seem to still use MBUtil:
# #   https://github.com/klokantech/vector-tiles-sample#host-the-vector-tiles-without-any-server-at-all
# mb-util --image_format=pbf sequences.mbtiles tiles

# # The extracted files are gzipped, the following commands unzips them:
# find ./tiles -name "*.pbf" -exec mv {} {}.gz \;
# gunzip ./tiles -r

while read sequence; do
  filename="$(jq -r '.id' <<< $sequence).geojson"

  capturedAt="$(echo $sequence | jq -r '.properties.capturedAt[0]')"
  date=${capturedAt:0:10}
  path="sequences/${date//-//}"

  mkdir -p $path
  echo "$sequence" > $path/$filename



  # dir=

  # 2016-03-17
#   echo $in
#   echo "beer!!!"
done < sequences.ndjson
