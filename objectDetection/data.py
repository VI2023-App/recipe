from torch.utils.data import DataLoader
from torchvision import datasets
import pytorch_lightning as pl
from torchvision import transforms

transform = transforms.Compose([
        transforms.RandomRotation(10),      # rotate +/- 10 degrees
        transforms.RandomHorizontalFlip(),  # reverse 50% of images
        transforms.Resize(224),             # resize shortest side to 224 pixels
        transforms.CenterCrop(224),         # crop longest side to 224 pixels at center
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
])


class DataModule(pl.LightningDataModule):

    def __init__(self, transform=transform, batch_size=32):
        super().__init__()
        self.train_dir = "data/train"
        self.valid_dir = "data/validation"
        self.test_dir = "data/test"
        self.transform = transform
        self.batch_size = batch_size

    def setup(self, stage=None):
        trainset = datasets.ImageFolder(root=self.train_dir, transform=self.transform)
        validset = datasets.ImageFolder(root=self.valid_dir, transform=self.transform)
        testset = datasets.ImageFolder(root=self.test_dir, transform=self.transform)

        self.trainloader = DataLoader(trainset, batch_size=self.batch_size, shuffle=True)
        self.validloader = DataLoader(validset, batch_size=self.batch_size)
        self.testloader = DataLoader(testset, batch_size=self.batch_size)

    def train_dataloader(self):
        return self.trainloader

    def valid_dataloader(self):
        return self.validloader

    def test_dataloader(self):
        return self.testloader
