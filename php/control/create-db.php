<?php
	require_once(__DIR__ . "/../model/config.php");//require once is to require a file once
	//__DIR__  a escape plan form the model to the database.php

		

		 $query = $_SESSION["connection"]->query("CREATE TABLE users (" //this query here are attach to our database connection with store in session varible
		 . "id int(11) NOT NULL AUTO_INCREMENT,"						 //id,username,email and password are store to the database that are connected to the SESSION
		 . "username varchar(30) NOt NULL," 
		 . "email varchar (50) NOT NULL,"
		 . "password char(128) NOT NULL,"
		 . "salt char(128) NOT NULL,"
		 . "exp int(4),"
		 . "exp1 int(4),"
		 . "exp2 int(4),"
		 . "exp3 int(4),"
		 . "exp4 int(4),"
		 . "PRIMARY KEY (id))");

if($query){
	echo "<p>successfully created users table</p>";
} else {
	echo "<p>" . $_SESSION["connection"] ->error."</P>";
}

































