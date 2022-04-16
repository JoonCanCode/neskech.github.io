import tensorflow as tf
import unicodedata
import numpy as np
from flask import app, jsonify, request
import selenium as sel



def standarize(text):
        text = unicodedata.normalize('NFKD', text)
        text = text.replace('\n', ' ')
        text = text.lower()
        text = text.strip()
        text = '[START] ' + text + ' [END]'
        return text


model = tf.saved_model.load('./Saved Models/JungBot')
   
@app.route("./index.html")
def my_webservice():
    return jsonify(result=translate(**request.args)) 

def translate(text):
    driver = sel.webdriver.
    text = standarize(text)
    text = np.array([text])
    response = model.tf_function(text)
    return response.get('text').numpy().decode()
    
    




