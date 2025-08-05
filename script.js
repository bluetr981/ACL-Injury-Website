sessionStorage.setItem("selected_model", "RF_Acc_[1, 2, 3, 4, 5]");

function returnMenuStatus() {
  let selectionMenuStatus = document.getElementById("selmod").value;

  sessionStorage.clear();
  sessionStorage.setItem("selected_model", selectionMenuStatus);
  document.getElementById("demo").innerHTML = "CURRENT MODEL: " + sessionStorage.getItem("selected_model");
}
