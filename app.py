from flask import Flask, render_template, request, url_for, redirect, session
import joblib
from xgboost import XGBClassifier
import numpy as np
import re

app = Flask(__name__)
app.secret_key = "110105103105104103104101103110"

path=""
input_array=[]
RESULT = -1

replacement_rules_feature = {
    "Male": 1,
    "Female": 0,
    "yes": 1,
    "no": 0
}

@app.route('/', methods=["POST", "GET"])
def home():
    if (request.method == "POST"):
        selectedmodel = request.form["select_model"]
        cts = request.form["CoronalTibialSlope"]
        mts = request.form["MedialTibialSlope"]
        lts = request.form["LateralTibialSlope"]
        mtd = request.form["MedialTibialDepth"]
        sex = request.form["selectsex"]
        
        session["CTS"] = cts
        session["MTS"] = mts
        session["LTS"] = lts
        session["MTD"] = mtd
        session["SEX"] = sex

        match selectedmodel:
              case "Model #1":
                path = f'models/trained_RF_Acc_model_[1, 2, 3, 4, 5]_1.joblib'
                input_array = np.array([cts, mts, lts, mtd, replacement_rules_feature[sex]])
              case "Model #2":
                path = f'models/trained_SVM_Acc_model_[1, 2, 3, 4, 5]_1.joblib'
                input_array = np.array([cts, mts, lts, mtd, replacement_rules_feature[sex]])
              case "Model #3":
                path = f'models/trained_SVM_Acc_model_[1, 2, 4, 5]_1.joblib'
                input_array = np.array([cts, mts, mtd, replacement_rules_feature[sex]])
              case "Model #4":
                path = f'models/trained_SVM_Fb_model_[2, 3, 4]_1.joblib'
                input_array = np.array([mts, lts, mtd])
              case "Model #5":
                path = f'models/trained_XGB_Fb_model_[1, 2, 3, 4, 5]_1.json'
                input_array = np.array([float(cts), float(mts), float(lts), float(mtd), int(replacement_rules_feature[sex])])
        
        input_array = input_array.reshape(1, -1)

        return redirect(url_for("home", SELECTED_MODEL=selectedmodel, CTS=cts, LTS=lts, MTS=mts, MTD=mtd, SEX=sex, SHOW_RESULT=True, RESULT=perform_inference(path, input_array)))
    else:
       if ("CTS" in session and "MTS" in session and "LTS" in session and "MTD" in session and "SEX" in session):
          session.pop("CTS", None)
          session.pop("MTS", None)
          session.pop("LTS", None)
          session.pop("MTD", None)
          session.pop("SEX", None)
          return render_template("index.html", SELECTED_MODEL=request.args.get("SELECTED_MODEL"), CTS=request.args.get("CTS"), MTS=request.args.get("MTS"), LTS=request.args.get("LTS"), MTD=request.args.get("MTD"), SEX=request.args.get("SEX"), RESULT=request.args.get("RESULTS"), SHOW_RESULT=True)
       return render_template("index.html", SHOW_RESULT=False, RESULT=-1)
       
def perform_inference(model_path:str, array:np.array) -> np.array:
    if model_path.endswith('joblib'):
        model = joblib.load(model_path)
    elif model_path.endswith('.json'):
        model = XGBClassifier()
        model.load_model(model_path)
    
    prediction = model.predict(array)
    return int(prediction[-1])

if __name__ == "__main__":
    app.run(debug=True)
