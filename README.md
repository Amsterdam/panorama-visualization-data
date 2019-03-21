# Data for Panorama Photo Visualization

Data for https://amsterdam.github.io/panorama-visualization/.

##  Data

To generate the GeoJSON data and vector tiles needed for this visualization, first run [panorama-export](https://github.com/Amsterdam/panorama-export/) to produce `images.ndjson` and `sequences.ndjson`.

Then, install [Tippecanoe](https://github.com/mapbox/tippecanoe), [jq](https://stedolan.github.io/jq/) and [MBUtil](https://github.com/mapbox/mbutil).

On MacOS, you can do this as follows:

    brew install tippecanoe
    brew install jq
    easy_install mbutil

Now, run [`extract.sh`](extract.sh):

    ./extract.sh

This script will create vector tiles from `sequences.ndjson` extract the individual .pbf files to the [`tiles`](tiles) directory. It will also create a single GeoJSON file for each sequence in `sequences.ndjson`.
