async function TestAPI() {
    var response = await fetch('https://acl-frameworkapitesting.onrender.com/healthz', {
        method: "POST",
        headers: {'Content-Type':'application/json'},

        body: JSON.stringify({"selected-model": "models/trained_RF_Acc_model_[1, 2, 3, 4, 5]_1.joblib",
                              "CoronalTibialSlope": "2",
                              "LateralTibialSlope": "12",
                              "MedialTibialDepth": "0",
                              "selected-sex": "Female",
                              "MedialTibialSlope": "7"}
    })
    .then(response => response.json())
    .then(data => console.log(data));
    
    location.reload();
}
