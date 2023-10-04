from flask import Flask, request, jsonify, Response, render_template, session
from PIL import Image
from yolo import classification
from prefix import make_prefix
from generator import try_gpt_chat
import io

app = Flask(__name__)

app.secret_key = 'secret'

@app.route('/')
def my_index():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload():
    try:
        image = request.files['image']
        
        if image:
            img = Image.open(io.BytesIO(image.read()))
            result = classification(img)
            prefix_text = make_prefix(result)
            print(prefix_text)
            # reply = try_gpt_chat(prefix_text, result)
            # print(reply)
            session['prefix'] = prefix_text
            # session['reply'] = reply
            
            # img_io = io.BytesIO() # ストリームに保存
            # img.save(img_io, format='PNG')
            # img_io.seek(0)
            # return Response(img_io, mimetype='image/png')
            return jsonify({'text': prefix_text})
        else:
            return jsonify({'message':'no image'}), 400
    except Exception as e:
        return jsonify({'message':'error', 'error':str(e)}), 500

@app.route('/get', methods=['GET'])
def get_reply():
    reply = "test"
    reply = session.get('prefix')
    # reply = session.get('reply')
    print("get recipe:" + reply)
    return jsonify({'text': reply})


if __name__ == '__main__':
    app.run(debug=True)