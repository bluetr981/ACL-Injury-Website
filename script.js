function returnMenuStatus() {
  let selectionMenuStatus = document.getElementById("selmod").value;
  sessionStorage.setItem("selected_model", selectionMenuStatus);
}

function returnReqFormInputs() {
  const selectionChoice = sessionStorage.getItem("selected_model");
		
	if (selectionChoice == "SVM_Acc_model_[1, 2, 4, 5]") {
    document.getElementById("lts-label").style.display = "none";
		document.getElementById("LTS").style.display = "none";
	}
	else if (selectionChoice == "SVM_F2_model_[2, 3, 4]") {
    document.getElementById("cts-label").style.display = "none";
		document.getElementById("CTS").style.display = "none";
		document.getElementById("select-sex").style.display = "none";
		document.getElementById("selsex").style.display = "none";
	}
}
