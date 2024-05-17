import cv2
import pandas as pd


def get_color_info(img_path):
    img = cv2.imread(img_path)
    index = ["color", "color_name", "hex", "R", "G", "B", "frame1", "frame2", "frame3"]
    csv = pd.read_csv('output_file.csv', names=index, header=None)

    def get_color_name(R, G, B):
        minimum = 10000
        for i in range(len(csv)):
            d = abs(R - int(csv.loc[i, "R"])) + abs(G - int(csv.loc[i, "G"])) + abs(B - int(csv.loc[i, "B"]))
            if d <= minimum:
                minimum = d
                cname = csv.loc[i, "color_name"]
                frame1 = csv.loc[i, "frame1"]
                frame2 = csv.loc[i, "frame2"]
                frame3 = csv.loc[i, "frame3"]
        return cname, frame1, frame2, frame3

    center_x = img.shape[1] // 2
    center_y = img.shape[0] // 2

    b, g, r = img[center_y, center_x]

    color_name, f1, f2, f3 = get_color_name(r, g, b)

    return color_name, (r, g, b), f1, f2, f3
