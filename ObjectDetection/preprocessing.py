import os

directory = 'D:/GitHub/recipe/ObjectDetection/data_vegetable/labels/val'  # ファイルが存在するディレクトリへのパス
file_list = [os.path.join(directory, filename) for filename in os.listdir(directory) if filename.endswith('.txt')]

for file_path in file_list:
    with open(file_path, 'r') as file:
        file_data = file.read()

    # 指定の文字列を他の文字列に置換
    replaced_data = file_data.replace('3 ', '17 ')

    with open(file_path, 'w') as file:
        file.write(replaced_data)
