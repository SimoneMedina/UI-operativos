from flask import Flask, jsonify
from flask_cors import CORS
import psutil
import random

app = Flask(__name__)
CORS(app)

@app.route("/api/system")
def system_stats():
    return jsonify({
        "cpu": psutil.cpu_percent(),
        "ram": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage("/").percent
    })

@app.route("/api/network")
def network_stats():
    return jsonify({
        "packets": random.randint(100, 1000),
        "connections": random.randint(10, 100)
    })

@app.route("/api/alerts")
def alerts():
    return jsonify([
        "Acceso sospechoso detectado",
        "Alto consumo de CPU",
        "Tráfico inusual en red"
    ])

if __name__ == "__main__":
    app.run(debug=True)
