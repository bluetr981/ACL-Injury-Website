from flask import Flask, render_template, request, url_for, redirect, session
import joblib
from xgboost import XGBClassifier
import numpy as np
import re

app = Flask(__name__)
app.secret_key = "110105103105104103104101103110"
REQUEST_HISTORY = []
LAST_REQUEST = ""

path=""
input_array=[]
RESULT = -1
MODEL_CHOSEN = False

replacement_rules_feature = {
    "Male": 1,
    "Female": 0,
    "yes": 1,
    "no": 0
}

@app.route('/', methods=["POST", "GET"])
def home():
    if (request.method == "POST"):
        if ("MedialTibialDepth" in request.form):
          REQUEST_HISTORY.append("POST")
          LAST_REQUEST = "POST"

          session["REQUEST_HISTORY"] = REQUEST_HISTORY
          session["LAST_REQUEST"] = LAST_REQUEST

          match session["SELECTED_MODEL"]:
              case "Model #1" | "Model #2" | "Model #5":
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
                  
                  path = f'models/trained_RF_Acc_model_[1, 2, 3, 4, 5]_1.joblib'
                  input_array = np.array([cts, mts, lts, mtd, replacement_rules_feature[sex]]).reshape(1, -1)

                  return redirect(url_for("home", REQUEST_HISTORY=session.get("REQUEST_HISTORY", []), SELECTED_MODEL = session["SELECTED_MODEL"], MODEL_CHOSEN = True, CTS=cts, MTS=mts, LTS=lts, MTD=mtd, SEX=sex, SHOW_RESULT=True, RESULT=perform_inference(path, input_array)))

              case "Model #3":
                  cts = request.form["CoronalTibialSlope"]
                  mts = request.form["MedialTibialSlope"]
                  mtd = request.form["MedialTibialDepth"]
                  sex = request.form["selectsex"]
                  
                  session["CTS"] = cts
                  session["MTS"] = mts
                  session["MTD"] = mtd
                  session["SEX"] = sex
                  
                  path = f'models/trained_SVM_Acc_model_[1, 2, 4, 5]_1.joblib'
                  input_array = np.array([cts, mts, mtd, replacement_rules_feature[sex]]).reshape(1, -1)

                  return redirect(url_for("home", REQUEST_HISTORY=session.get("REQUEST_HISTORY", []), SELECTED_MODEL = session["SELECTED_MODEL"], MODEL_CHOSEN = True, CTS=cts, MTS=mts, MTD=mtd, SEX=sex, SHOW_RESULT=True, RESULT=perform_inference(path, input_array)))

              case "Model #4":
                  mts = request.form["MedialTibialSlope"]
                  lts = request.form["LateralTibialSlope"]
                  mtd = request.form["MedialTibialDepth"]

                  session["MTS"] = mts
                  session["LTS"] = lts
                  session["MTD"] = mtd
                  
                  path = f'models/trained_SVM_Fb_model_[2, 3, 4]_1.joblib'
                  input_array = np.array([mts, lts, mtd]).reshape(1, -1)

                  return redirect(url_for("home", REQUEST_HISTORY = session.get("REQUEST_HISTORY", []), SELECTED_MODEL = session["SELECTED_MODEL"], MODEL_CHOSEN = True, MTS=mts, LTS=lts, MTD=mtd, SHOW_RESULT=True, RESULT=perform_inference(path, input_array)))
        elif session["LAST_REQUEST"] == "POST":
            REQUEST_HISTORY.append("POST")
            LAST_REQUEST = "POST"

            session["REQUEST_HISTORY"] = REQUEST_HISTORY
            session["LAST_REQUEST"] = LAST_REQUEST

            return redirect(url_for("home", REQUEST_HISTORY = session.get("REQUEST_HISTORY", []), MODEL_CHOSEN=False, SHOW_RESULT=False, RESULT=-1))
        else:
           selectedmodel = request.form["select_model"]

           REQUEST_HISTORY.append("POST")
           LAST_REQUEST = "POST"

           session["SELECTED_MODEL"] = selectedmodel
           session["REQUEST_HISTORY"] = REQUEST_HISTORY
           session["LAST_REQUEST"] = LAST_REQUEST

           return render_template("index.html", REQUEST_HISTORY = session.get("REQUEST_HISTORY", []), MODEL_CHOSEN = True, SELECTED_MODEL=session["SELECTED_MODEL"])
    else:
       if ("SELECTED_MODEL" in session and "SELECTED_MODEL" in request.args and session["LAST_REQUEST"] != "GET"):
          REQUEST_HISTORY.append("GET")
          LAST_REQUEST = "GET"

          session["REQUEST_HISTORY"] = REQUEST_HISTORY
          session["LAST_REQUEST"] = LAST_REQUEST

          match session["SELECTED_MODEL"]:
              case "Model #1" | "Model #2" | "Model #5":
                  session.pop("CTS", None)
                  session.pop("MTS", None)
                  session.pop("LTS", None)
                  session.pop("MTD", None)
                  session.pop("SEX", None)

                  return render_template("index.html", REQUEST_HISTORY=session.get("REQUEST_HISTORY", []), SELECTED_MODEL = request.args.get("SELECTED_MODEL"), MODEL_CHOSEN = True, cts = request.args.get("CTS"), mts = request.args.get("MTS"), lts = request.args.get("LTS"), mtd = request.args.get("MTD"), sex = request.args.get("SEX"), RESULT=request.args.get("RESULT"), SHOW_RESULT=True)

              case "Model #3":
                  session.pop("CTS", None)
                  session.pop("MTS", None)
                  session.pop("MTD", None)
                  session.pop("SEX", None)

                  return render_template("index.html", REQUEST_HISTORY=session.get("REQUEST_HISTORY", []), SELECTED_MODEL = request.args.get("SELECTED_MODEL"), MODEL_CHOSEN = True, cts = request.args.get("CTS"), mts = request.args.get("MTS"), mtd = request.args.get("MTD"), sex = request.args.get("SEX"), RESULT=request.args.get("RESULT"), SHOW_RESULT=True)

              case _:
                  session.pop("MTS", None)
                  session.pop("LTS", None)
                  session.pop("MTD", None)

                  return render_template("index.html", REQUEST_HISTORY=session.get("REQUEST_HISTORY", []), SELECTED_MODEL = request.args.get("SELECTED_MODEL"), MODEL_CHOSEN = True, mts = request.args.get("MTS"), lts = request.args.get("LTS"), mtd = request.args.get("MTD"), RESULT=request.args.get("RESULT"), SHOW_RESULT=True)
       elif ("SELECTED_MODEL" in request.args and session["LAST_REQUEST"] == "GET"):
           return render_template("index.html", REQUEST_HISTORY = session.get("REQUEST_HISTORY", []), MODEL_CHOSEN=False, SHOW_RESULT=False, RESULT=-1)
       elif (len(REQUEST_HISTORY) > 3 and REQUEST_HISTORY[-1] == "GET" or len(REQUEST_HISTORY) >= 2 and len(REQUEST_HISTORY) <= 3 and session["LAST_REQUEST"] == "GET"):
           return render_template("index.html", REQUEST_HISTORY = session.get("REQUEST_HISTORY", []), MODEL_CHOSEN=False, SHOW_RESULT=False, RESULT=-1)
       else:
           REQUEST_HISTORY.append("GET")
           LAST_REQUEST = "GET"

           session["REQUEST_HISTORY"] = REQUEST_HISTORY
           session["LAST_REQUEST"] = LAST_REQUEST

           if ("SELECTED_MODEL" in session):
               return render_template("index.html", SELECTED_MODEL = session["SELECTED_MODEL"], REQUEST_HISTORY = session.get("REQUEST_HISTORY", []), MODEL_CHOSEN=False, SHOW_RESULT=False, RESULT=-1)
           else:
               session.pop("SELECTED_MODEL", None)
               return render_template("index.html", REQUEST_HISTORY = session.get("REQUEST_HISTORY", []), MODEL_CHOSEN=False, SHOW_RESULT=False, RESULT=-1)
               
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
