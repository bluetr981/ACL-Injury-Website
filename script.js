function returnMenuStatus() {
  const selectionMenuStatus = document.getElementById("selmod").value;
  document.getElementById("demo").innerHTML = "You have selected " + selectionMenuStatus;

  return document.getElementById("selmod").value = selectionMenuStatus;
}
