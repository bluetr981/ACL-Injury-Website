function returnMenuStatus() {
  let selectionMenuStatus = document.getElementById("selmod").value;
  sessionStorage.setItem("selected_model", selectionMenuStatus);

  if (sessionStorage.getItem("CTS-degrees") != null) {
    sessionStorage.removeItem("CTS-degrees");
  }

  if (sessionStorage.getItem("MTS-degrees") != null) {
    sessionStorage.removeItem("MTS-degrees");
  }

  if (sessionStorage.getItem("LTS-degrees") != null) {
    sessionStorage.removeItem("LTS-degrees");
  }

  if (sessionStorage.getItem("MTD-degrees") != null) {
    sessionStorage.removeItem("MTD-degrees");
  }

  if (sessionStorage.getItem("selected-sex") != null) {
    sessionStorage.removeItem("selected-sex");
  }
  location.reload();
}

function updateCoronalTibialSlope() {
  if (sessionStorage.getItem("CTS-degrees") == null) {
      sessionStorage.setItem("CTS-degrees", document.getElementById("CTS").value);
  }
  else {
    sessionStorage.removeItem("CTS-degrees");
    sessionStorage.setItem("CTS-degrees", document.getElementById("CTS").value);
  }
}

function updateMedialTibialSlope() {
  if (sessionStorage.getItem("MTS-degrees") == null) {
      sessionStorage.setItem("MTS-degrees", document.getElementById("MTS").value);
  }
  else {
    sessionStorage.removeItem("MTS-degrees");
    sessionStorage.setItem("MTS-degrees", document.getElementById("MTS").value);
  }
}

function updateLateralTibialSlope() {
  if (sessionStorage.getItem("LTS-degrees") == null) {
      sessionStorage.setItem("LTS-degrees", document.getElementById("LTS").value);
  }
  else {
    sessionStorage.removeItem("LTS-degrees");
    sessionStorage.setItem("LTS-degrees", document.getElementById("LTS").value);
  }
}

function updateMedialTibialDepth() {
  if (sessionStorage.getItem("MTD-degrees") == null) {
      sessionStorage.setItem("MTD-degrees", document.getElementById("MTD").value);
  }
  else {
    sessionStorage.removeItem("MTD-degrees");
    sessionStorage.setItem("MTD-degrees", document.getElementById("MTD").value);
  }
}

function updateSelectedSex() {
  if (sessionStorage.getItem("selected-sex") == null) {
      sessionStorage.setItem("selected-sex", document.getElementById("selsex").value);
  }
  else {
    sessionStorage.removeItem("selected-sex");
    sessionStorage.setItem("selected-sex", document.getElementById("selsex").value);
  }
}

/*async function retrievePrediction() {
  var response;
  
  response = await fetch('https://acl-frameworkapitesting.onrender.com/healthz', {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"selected-model":"models/trained_" + sessionStorage.getItem("selected-model"),
                              "CoronalTibialSlope":sessionStorage.getItem("CTS-degrees"),
                              "MedialTibialSlope":sessionStorage.getItem("MTS-degrees"),
                              "LateralTibialSlope":sessionStorage.getItem("LTS-degrees"), 
                              "MedialTibialDepth":sessionStorage.getItem("MTD-degrees"),
                              "selected-sex":sessionStorage.getItem("selected-sex")})
      });
  
  const prediction = await response.text()

  sessionStorage.setItem("RESULT", prediction);
  
  return prediction;
}*/
