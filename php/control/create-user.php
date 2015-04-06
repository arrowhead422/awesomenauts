
<li><a href="/php/blog.php">Home</a> </li> 

<?php

	require_once(__DIR__ . "/../model/config.php");

	//$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL); //this variable are able to create a email that can be store it in our php
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);//this variable username will connect to the register-form.php and you will have to type out your own username
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);


	

	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
	 // Php.net   this funcation is called crypt, the crypt we are using right now are hast or cover up the password to prevented to user to have the same password 
	
	$hashedPassword = crypt ($password, $salt);

	$query = $_SESSION["connection"]->query("INSERT INTO users SET " // with this function query now we can store all the new email, username, and password in php admin.
			. "email = '',"
			. "username = '$username',"
			. "password = '$hashedPassword',"
			. "salt = '$salt', "
			. "exp = 0,"
			. "exp1 = 0,"
			. "exp2= 0,"
			. "exp3 = 0,"
			. "exp4 = 0,");

	$_SESSION["name"] = $username;
	
	if($query) {
		//Need this for Ajax on index.php
		echo "true";
	}

	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}



































