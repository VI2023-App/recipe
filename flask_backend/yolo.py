import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import openai
from ultralytics import YOLO


def classification(image):
    model = YOLO("best_vandf.pt")
    results = model.predict(source=image, save=True)
    
    detected_obj_names = []
    for r in results:
        for c in r.boxes.cls:
            if '_' in model.names[int(c)]:
                detected_obj_name = model.names[int(c)].split('_')[0]
            else:
                detected_obj_name = model.names[int(c)]
            detected_obj_names.append(detected_obj_name)
    
    detected_obj_names_string = ', '.join(detected_obj_names)
    return detected_obj_names_string