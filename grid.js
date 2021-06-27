import { invert } from "./tetrahedralMarkley.js";

const width = 2;
const height = Math.sqrt(3);

const x_num = 16 * 5;
const y_num = 16 * 4;

for (var i = 0; i <= x_num; i++) {
  for (var j = 0; j <= y_num; j++) {
    var x = (i / x_num) * width;
    var y = (j / y_num) * height;
    var record = { index: [i, j], coordinates: invert(x, y) };
    console.log(JSON.stringify(record));
  }
}
