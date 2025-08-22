async function TestAPI() {
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
    location.replace("https://bluetr981.github.io/ACL-Injury-Website/#result");
}
