import numpy as np
import pandas as pd
import rioxarray
import xarray as xr
from shapely.geometry import Polygon
from tqdm import tqdm

offset = -65

# Load elevation data
with xr.open_dataset("data/GEBCO_2021_CF.nc") as GEBCO:
    elevation = GEBCO.elevation
    elevation = elevation.coarsen(lon=10, lat=10).mean()
    elevation.rio.set_crs(GEBCO.crs.epsg_code)

rolling_offset = 8640 // 360 * offset
elevation.values = np.roll(elevation.values, rolling_offset, axis=1)

# Load grid data
grid_data = pd.read_json("data/grid.jsonl", lines=True)

grid_coordinates = pd.Series(
    grid_data["coordinates"].values,
    index=pd.MultiIndex.from_tuples(grid_data["index"]),
)

# Generate heightmap
heightmap = np.empty((16 * 4, 16 * 5))

indices = list(np.ndindex(*heightmap.shape))
for y, x in tqdm(indices, ascii=True):
    polygon = Polygon(
        [
            grid_coordinates[x + 0][y + 0],
            grid_coordinates[x + 0][y + 1],
            grid_coordinates[x + 1][y + 1],
            grid_coordinates[x + 1][y + 0],
        ]
    )
    clipped = elevation.rio.clip([polygon])
    heightmap[y][x] = clipped.mean()
    tqdm.write(f"{x}, {y}: {heightmap[y][x]}")

np.save("heightmap_east.npy", heightmap)
