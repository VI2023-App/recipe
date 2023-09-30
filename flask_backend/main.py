from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def my_index():
    return render_template("index.html", token="Hello Flask+React")

@app.route('/upload', methods=['POST'])
def upload():
    try:
        image = request.files['image']
        if image:
            return jsonify({'message':'image uploaded'}), 200
        else:
            return jsonify({'message':'no image'}), 400
    except Exception as e:
        return jsonify({'message':'error', 'error':str(e)}), 500

if __name__ == '__main__':
    app.run()