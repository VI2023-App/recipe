import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import openai
from ultralytics import YOLO


def classification(image):
    model = YOLO("best.pt")
    results = model.predict(source=image, save=True)
    
    detected_obj_names = []
    for r in results:
        for c in r.boxes.cls:
            detected_obj_names.append(model.names[int(c)])
    
    detected_obj_names_string = ', '.join(detected_obj_names)
    return detected_obj_names_string