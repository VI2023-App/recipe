import os
import numpy as np
import torch
import pytorch_lightning as pl
from torchvision.utils import make_grid
from torchvision import datasets, transforms, models
import matplotlib.pyplot as plt
from config import *
from data import DataModule
from model import ConvolutionalNetwork

# dataset path
train_dir = 'data/train'
valid_dir = 'data/validation'
test_dir = 'data/test'

# クラス取得
class_names = sorted(os.listdir(train_dir))
print(class_names)
num_classes = len(class_names)  # 36


def main(args):
    if args.device:
        device = torch.device(args.device)
    else:
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    datamodule = DataModule()
    datamodule.setup()
    model = ConvolutionalNetwork()
    model.to(device)
    trainer = pl.Trainer(max_epochs=40)
    trainer.fit(model, datamodule)
    datamodule.setup(stage='test')
    trainer.test(dataloaders=datamodule.test_dataloader())

    for images, labels in datamodule.test_dataloader():
        break
    im = make_grid(images, nrow=16)
    plt.figure(figsize=(12, 12))
    plt.imshow(np.transpose(im.numpy(), (1, 2, 0)))
    inv_normalize = transforms.Normalize(mean=[-0.485 / 0.229, -0.456 / 0.224, -0.406 / 0.225],
                                         std=[1 / 0.229, 1 / 0.224, 1 / 0.225])
    im = inv_normalize(im)
    plt.figure(figsize=(12, 12))
    plt.imshow(np.transpose(im.numpy(), (1, 2, 0)))

if __name__ == "__main__":
    main(args)
