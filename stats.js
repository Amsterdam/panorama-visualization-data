#!/usr/bin/env node

const H = require('highland')
const turf = require('@turf/turf')

let totalLength = 0
const dates = {}

const features = H(process.stdin)
  .split()
  .compact()
  .map(JSON.parse)
  .each((feature) => {
    const date = feature.properties.capturedAt[0].slice(0, 10)
    const length = turf.length(feature, {
      units: 'meters'
    })
    dates[date] = true

    totalLength += length
  })
  .done(() => {
    const stats = {
      length: Math.round(totalLength),
      days: Object.keys(dates).length
    }

    console.log(JSON.stringify(stats, null, 2))
  })
