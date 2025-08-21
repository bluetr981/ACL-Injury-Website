async function TestAPI() {
    var response = await fetch('https://acl-frameworkapitesting.onrender.com/healthz', {
        method: "POST",
        headers: {'Content-Type':'application/json'},

        body: JSON.stringify({"selected-model": "models/trained_RF_Acc_model_[1, 2, 3, 4, 5]_1.joblib",
                              "CoronalTibialSlope": 1,
                              "MedialTibialSlope": 2, 
                              "LateralTibialSlope": 3,
                              "MedialTibialDepth": 4,
                              "selected-sex": "Male"})
    })
    .then(response => response.json())
    .then(data => sessionStorage.setItem("RESULT", data.Prediction));
}
