import cv2
import numpy as np
import re

np.set_printoptions(8,1000000)

filename = 'testmap_2.png'
img = cv2.imread(filename)
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

gray = np.float32(gray)
dst = cv2.cornerHarris(gray,3,5,0.04)

#result is dilated for marking the corners, not important
#dst = cv2.dilate(dst,None)

# Threshold for an optimal value, it may vary depending on the image.
img[dst>0.01*dst.max()]=[0,0,128]


corners = np.argwhere(dst>0.01*dst.max())
coords = []

for corner in corners:
	match = None
	for i in range(len(coords)):
		coord = coords[i]
		if abs(coord[0]-corner[0]) + abs(coord[1]-corner[1])<11:
			match = i
			break
	if match == None:
		coords.append(corner)
	else:
		coords[i] = (coords[i] + corner) / 2
		
print coords

for coord in coords:
	img[coord[0],coord[1]] = [0,255,0]

coordstring = str(coords)
coordstring = coordstring.replace("array(", "")
coordstring = coordstring.replace(")", "")

target = open('hello.txt', 'w')
target.write(coordstring)
target.close()

# cv2.namedWindow("Display frame", cv2.WINDOW_NORMAL)

# raw_input("prompt: ")

cv2.imshow('dst',img)
if cv2.waitKey(0) & 0xff == 27:
    cv2.destroyAllWindows()
	