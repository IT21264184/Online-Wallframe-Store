from flask import Flask, request, jsonify
from ColorFindingFunction import get_color_info
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/get-color", methods=["POST"])
def get_color():
    try:
        
        if 'image' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['image']
        file.save('temp_image.jpg')

        color_name, rgb_values, f1, f2, f3 = get_color_info('temp_image.jpg')
        rgb_values_serializable = tuple(int(value) for value in rgb_values)

        return jsonify({
            "color_name": color_name,
            "rgb_values": rgb_values_serializable,
            "frames": [f1, f2, f3]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
