import pandas as pd
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import math
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the dataframe
df = pd.read_csv('walmart_cleaned.csv')

# Base Route
@app.route("/")
def index():
    return render_template("index.html")

# API Route
@app.route("/api")
def api():
    # Convert dataframe to a list of dictionaries
    data = df.to_dict(orient='records')

    # Return JSON data
    return jsonify(data)

# Run
if __name__ == "__main__":
    app.run()