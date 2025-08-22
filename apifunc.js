function adjustInputs(storageItem) {
    if (sessionStorage.getItem(storageItem) == null) {
        sessionStorage.removeItem(storageItem);
        sessionStorage.setItem(storageItem, "0");
    }
}

async function TestAPI() {
    adjustInputs("CTS-degrees");
    adjustInputs("MTS-degrees");
    adjustInputs("LTS-degrees");
    adjustInputs("MTD-degrees");
    adjustInputs("selected-sex");
    
    var response = await fetch('https://acl-frameworkapitesting.onrender.com/healthz', {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"selected-model": sessionStorage.getItem("selected_model"),
                              "CoronalTibialSlope": String(sessionStorage.getItem("CTS-degrees")).replace(null, "-1"),
                              "MedialTibialSlope": String(sessionStorage.getItem("MTS-degrees")).replace(null, "-1"), 
                              "LateralTibialSlope": String(sessionStorage.getItem("LTS-degrees")).replace(null, "-1"),
                              "MedialTibialDepth": String(sessionStorage.getItem("MTD-degrees")).replace(null, "-1"),
                              "selected-sex": String(sessionStorage.getItem("selected-sex")).replace(null, "-1")})
    })
        
    .then(response => response.json())
    .then(data => sessionStorage.setItem("RESULT", data.Prediction));

    location.reload();
}
