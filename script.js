function returnMenuStatus() {
  const selectionMenuStatus = document.getElementById("selmod").value;
  sessionStorage.setItem("selected_model", selectionMenuStatus);
}
