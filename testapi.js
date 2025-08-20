async function TestAPI(selected_model, CTS, MTS, LTS, MTD, selected_sex) {
    var response = await fetch('https://acl-frameworkapitesting.onrender.com/healthz', {
        method: "POST",
        headers: {'Content-Type':'application/json'},

        body: JSON.stringify({"selected-model": selected_model,
                              "CoronalTibialSlope": String(CTS).replace(null, "0"),
                              "MedialTibialSlope": String(MTS).replace(null, "0"),
                              "LateralTibialSlope": String(LTS).replace(null, "0"),
                              "MedialTibialDepth": String(MTD).replace(null, "0"),
                              "selected-sex": String(selected_sex).replace(null, "0")
    })
    .then(response => response.json())
    .then(data => console.log(data));
}
