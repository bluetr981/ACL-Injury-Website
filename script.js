function returnMenuStatus() {
  const selectionMenuStatus = document.getElementById("selmod").value;
  document.getElementById("demo").innerHTML = "You have selected " + selectionMenuStatus;
  sessionStorage.setItem("selected_model", selectionMenuStatus);
  document.getElementById("demo1").innerHTML = "CURRENT SELECTION: " + sessionStorage.getItem("selected_model");
}
