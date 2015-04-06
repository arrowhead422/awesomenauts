<?php 
	// read-post.php will display all the meassage on the blog.php
	

	require_once(__DIR__ . "/../model/config.php"); // connecting to config.php

	$query = "SELECT * FROM post";
	$result = $_SESSION["connection"]->query($query);

	if($result) {

		while ($row = mysqli_fetch_array($result)) { // with this code from 12 to 18 it could display all the meassage on the blog.php
			echo "<div class= 'post'>";
			echo "<h2>" . $row["title"] . "</h2>";
			echo "<br />";
			echo "<p>" . $row["post"] . "</h1>";
			echo "<br/>";
			echo "</div>";
			
		}




	}
		if($query){//is this query works then it will echo out this sentence

		 	echo "<p>successfully created the table: posts</p>";
		 }
		 else{
		 	echo "<p>" . $_SESSION["connection"]->error . "</p>";
		 }