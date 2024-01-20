from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import subprocess

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/compile', methods=['POST'])
@cross_origin()
def compile_code():
    try:
        code = request.json['code']
        result = subprocess.check_output(['python', '-c', code], stderr=subprocess.STDOUT, text=True)
        return jsonify({'result': result.strip()})
    except subprocess.CalledProcessError as e:
        return jsonify({'error': e.output.strip()}), 500

if __name__ == '__main__':
    app.run(debug=True)