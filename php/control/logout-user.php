

<?php
	require_once(__DIR__ . "/../model/config.php");


	unset($_SESSION["authenticated"]);  //deted the session

	session_destroy();
	header("Location: " . $path . "blog.php");
			
?>
