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
  if (y === 0) {
    if (x === 0) return [-90, latitude];
    if (x === 1) return [0, 90];
    if (x === 2) return [90, latitude];
  }

  if (y === Math.sqrt(3)) {
    if (x < 1) {
      return [0, tetrahedralMarkley.invert([x, y])[1]];
    }
    if (x === 1) {
      return [0, -latitude];
    }
    if (x > 1) {
      return [0, tetrahedralMarkley.invert([2 - x, y])[1]];
    }
  }

  return tetrahedralMarkley.invert([x, y]);
}
