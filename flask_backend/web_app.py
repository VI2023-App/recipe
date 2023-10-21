from flask import Flask, request, jsonify, Response, render_template, session, send_file
from PIL import Image
from yolo import classification
from prefix import make_prefix
from generator import try_gpt_chat
import io
import os
import base64

app = Flask(__name__)


def serve_pil_image(pil_img):
    img_io = io.BytesIO()
    pil_img.save(img_io, 'PNG')
    img_io.seek(0)
    return img_io

@app.route('/')
def my_index():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload():
    try:
        image = request.files['image']
        
        if image:
            img = Image.open(io.BytesIO(image.read()))
            result, results_plotted = classification(img)
            prefix_text = make_prefix(result)
            print(prefix_text)
            # reply = try_gpt_chat(prefix_text, result)
            # print(reply)
            
            # ndarrayをPillowのImageに変換
            results_plotted_pl = Image.fromarray(results_plotted)
            # BytesIOからデータを取得
            image_data = serve_pil_image(results_plotted_pl).getvalue()
            # バイトデータをBase64エンコード
            image_data_base64 = base64.b64encode(image_data).decode('utf-8')
            
            return jsonify({'text': prefix_text, 'image': image_data_base64})
        else:
            return jsonify({'message':'no image'}), 400
    except Exception as e:
        return jsonify({'message':'error', 'error':str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)