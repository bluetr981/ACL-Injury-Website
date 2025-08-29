function adjustInputs(storageItem) {
    if (sessionStorage.getItem(storageItem) == null) {
        sessionStorage.removeItem(storageItem);
        sessionStorage.setItem(storageItem, "-1");
    }
}

function redirectToResult() {
    if (sessionStorage.getItem("RESULT") == LIKELY_RESULT) {
        location.replace("https://bluetr981.github.io/ACL-Injury-Website/#result-l");
    }
    else {
        location.replace("https://bluetr981.github.io/ACL-Injury-Website/#result-u");
    }
}

async function TestAPI() {
    const UNLIKELY_RESULT = '0';
    const LIKELY_RESULT = '1';
    
    adjustInputs("CTS-degrees");
    adjustInputs("MTS-degrees");
    adjustInputs("LTS-degrees");
    adjustInputs("MTD-degrees");
    adjustInputs("selected-sex");

    document.getElementById("submissionstatus").style.display = "block";
    document.getElementById("submissionstatus").innerHTML = "Loading...";
    
    var response = await fetch('https://acl-frameworkapitesting.onrender.com/healthz', {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"selected-model": sessionStorage.getItem("selected_model"),
                              "CoronalTibialSlope": sessionStorage.getItem("CTS-degrees"),
                              "MedialTibialSlope": sessionStorage.getItem("MTS-degrees"), 
                              "LateralTibialSlope": sessionStorage.getItem("LTS-degrees"),
                              "MedialTibialDepth": sessionStorage.getItem("MTD-degrees"),
                              "selected-sex": sessionStorage.getItem("selected-sex")})
    })
        
    .then(response => response.json())
    .then(data => sessionStorage.setItem("RESULT", data.Prediction));

    document.getElementById("submissionstatus").style.display = "none";
    document.getElementById("submissionstatus").innerHTML = "";

    location.reload();
}
