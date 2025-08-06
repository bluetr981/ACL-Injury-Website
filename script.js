function returnMenuStatus() {
  let selectionMenuStatus = document.getElementById("selmod").value;
  sessionStorage.setItem("selected_model", selectionMenuStatus);
  location.reload();
}

function updateCoronalTibialSlope() {
  sessionStorage.removeItem("CTS-degrees");
  sessionStorage.setItem("CTS-degrees", document.getElementById("CTS").value);
}

function updateMedialTibialSlope() {
  sessionStorage.removeItem("MTS-degrees");
  sessionStorage.setItem("MTS-degrees", document.getElementById("MTS").value);
}

function updateLateralTibialSlope() {
  sessionStorage.removeItem("LTS-degrees");
  sessionStorage.setItem("LTS-degrees", document.getElementById("LTS").value);
}

function updateMedialTibialDepth() {
  sessionStorage.removeItem("MTD-degrees");
  sessionStorage.setItem("MTD-degrees", document.getElementById("MTD").value);
}

function updateSelectedSex() {
  sessionStorage.removeItem("selected-sex");
  sessionStorage.setItem("selected-sex", document.getElementById("selsex").value);
}
