async function TestAPI(selected_model, CTS, MTS, LTS, MTD, selected_sex) {
    var response = await fetch('https://acl-frameworkapitesting.onrender.com/healthz', {
        method: "POST",
        headers: {'Content-Type':'application/json'},

        body: JSON.stringify({"selected-model": selected_model,
                              "CoronalTibialSlope": CTS,
                              "MedialTibialSlope": MTS,
                              "LateralTibialSlope": LTS,
                              "MedialTibialDepth": MTD,
                              "selected-sex": selected})
    })
    .then(response => response.json())
    .then(data => console.log(data));
}
