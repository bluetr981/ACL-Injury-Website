let selectionMenuStatus = document.getElementById("selmod").value;

function returnMenuStatus() {
  sessionStorage.setItem("selected_model", selectionMenuStatus);
  document.getElementById("demo").innerHTML = "CURRENT MODEL: " + sessionStorage.getItem("selected_model");
}
