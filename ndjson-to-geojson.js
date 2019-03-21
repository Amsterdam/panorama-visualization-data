#!/usr/bin/env node

const H = require('highland')

let i = 0

const features = H(process.stdin)
  .split()
  .compact()
  .map(JSON.parse)
  .map((feature) => ({
    type: 'Feature',
    id: i,
    properties: {
      id: feature.id,
      featureId: i++,
      surface: feature.properties.tags.includes('surface-land') ? 'land' : 'water',
      capturedAt: feature.properties.capturedAt[0]
    },
    geometry: feature.geometry
  }))
  .compact()
  .map(JSON.stringify)
  .intersperse(',\n')

H([
  H(['{"type":"FeatureCollection","features":[']),
  features,
  H([']}\n'])
]).sequence()
  .pipe(process.stdout)