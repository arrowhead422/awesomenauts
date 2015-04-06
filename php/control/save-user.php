<?php
	require_once(__DIR__ . "/../model/config.php");

	$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);// all this input post are the exact the samething for any other exp user 
	// but it does save players exp and gold
	$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
	$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
	$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
	$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);

	
	$query = $_SESSION["connection"]->query("UPDATE users SET "
			. "exp = $exp, " // the . use for combing or attacting something that are not part of the code. 
			. "exp1 = $exp1, "
			. "exp2 = $exp2, "
			. "exp3 = $exp3, "
			. "exp4 = $exp4  WhERE username = \"" . $_SESSION["name"]."\" "); // it save the data from our curing varible and backstash can pervent from error

	if($query){
		echo "true";
	}else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
			
