<html>
<head>
	<title></title>
</head>
<body>
<li><a href="/php/blog.php">Home</a> </li> 

<?php

	require_once(__DIR__ . "/../model/config.php");

	 // this code connect the database to the create-post.php//is bent delete
	//it create a new mysqli

	//it recevie information from the post and the title from the the filter input and it also sercer the blogs informations
	$title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);
	$post = filter_input(INPUT_POST,"post", FILTER_SANITIZE_STRING);
	$date = new DateTime('today');// date variable
	$time = new DateTime('America/Los_Angeles');//time variable 

	// the title and the post are connect to the form and the post which when it echo it echos out the "title" and "post"
	$query = $_SESSION["connection"]->query("INSERT INTO posts SET title = '$title', post = '$post' ");//this query that insers post that set the variable to $title and $post 

	if ($query) {
		
		echo "<p>Successfuly inserted post: $title</p>";// if the query is true then it will echo out this echo
		echo "Posted on: " . $date->format("M/D" . "" . "d/Y") . " at " . $time->format("g:i");// it echo out the system of the varible $data and $time
	}

	else {

		echo "<p>" . $_SESSION["connection"]->error . "</p>";// if is not true then it will print out this echo

	}

?>

</body>
</html>

	























