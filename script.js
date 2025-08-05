let selectionMenuStatus = document.getElementById("selmod").value;

function returnMenuStatus() {
  sessionStorage.setItem("selected_model", selectionMenuStatus);
}
