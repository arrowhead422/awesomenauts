<?php
	require_once(__DIR__ . "/../model/config.php");

	function authenticateUser()  {     // when ever login-verify require once then the function authenticateUser will check where there where not the user login is ture.
		if(!isset($_SESSION["authenticated"])) {

			return false;

		}

		else{
			if($_SESSION["authenticated"] != true){
				return false;
			}

			else {
				return true;
			}

		}

	}