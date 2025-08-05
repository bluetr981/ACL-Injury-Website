const selectionMenuStatus = document.getElementById("selmod").value;
sessionStorage.setItem("model_chosen", "no");

function returnMenuStatus() {
  sessionStorage.setItem("selected_model", selectionMenuStatus);
}

function checkModelSubmissionStatus() {
  sessionStorage.getItem("model_chosen") = "yes";
}
