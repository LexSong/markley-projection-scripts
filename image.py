import cv2
import numpy as np

filename = "images/markley-1600x640.png"
image = cv2.imread(filename, cv2.IMREAD_GRAYSCALE)
image = cv2.resize(image, (160, 64), interpolation=cv2.INTER_AREA)

# Clipping
output = np.empty_like(image)
output[image < 30] = 0
output[(30 <= image) & (image < 255)] = 128
output[image == 255] = 255

cv2.imwrite("images/markley-160x64.png", output)
