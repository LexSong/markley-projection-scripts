import { geoTetrahedralLee } from "d3-geo-polygon";

// Singularities are at latitudes 35.26439
const latitude = (Math.acos(1 / 3) / 2 / Math.PI) * 180;
const rotate = [180, latitude - 90, 180];

const tetrahedralMarkley = geoTetrahedralLee()
  .rotate(rotate)
  .fitWidth(2, {
    type: "MultiPoint",
    coordinates: [
      [0, 90],
      [-90, 0],
      [90, 0],
    ],
  });

export function invert(x, y) {
  return tetrahedralMarkley.invert([x, y]);
}
