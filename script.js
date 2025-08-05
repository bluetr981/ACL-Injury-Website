function returnMenuStatus() {
  let selectionMenuStatus = document.getElementById("selmod").value;

  sessionStorage.setItem("selected_model", selectionMenuStatus);
  document.getElementById("demo").innerHTML = "CURRENT MODEL: " + sessionStorage.getItem("selected_model");
}
