function returnMenuStatus() {
  let selectionMenuStatus = document.getElementById("selmod").value;
  sessionStorage.setItem("selected_model", selectionMenuStatus);
  window.location.reload(true);
}
