import json
import pickle
import numpy as np


def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index=data_columns.index(location.lower())
    except:
        loc_index=-1
    x=np.zeros(len(data_columns))
    x[0]=sqft
    x[1]=bath
    x[2]=bhk
    if loc_index>=0:
        x[loc_index]=1
    return round(model.predict([x])[0],2)

def get_location_names():
    return location


def load_saved_artifacts():

    global data_columns
    global location
    global model
    with open("./artifacts/columns.json",'r') as f:
        data_columns=json.load(f)['data_columns']
        location=data_columns[3:]

    with open("./artifacts/banglore_home_prices_model.pickle",'rb') as f:
        model=pickle.load(f)
    print("Loading Artifacts Done...")

load_saved_artifacts()
get_location_names()
