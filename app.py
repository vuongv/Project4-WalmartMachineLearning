import pandas as pd
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import math
import numpy as np

app = Flask(__name__)
CORS(app)

# Base Route
@app.route("/")
def index():
    return render_template("index.html")

# API Route
@app.route("/api")
def api():
    return 

# Run
if __name__ == "__main__":
    app.run()