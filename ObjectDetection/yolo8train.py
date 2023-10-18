from ultralytics import YOLO
import os

def main():
    model = YOLO("yolov8l.pt")
    model.train(data="mycoco.yaml", epochs=100, batch=8)
    model.val()

if __name__ == "__main__":
    main()
