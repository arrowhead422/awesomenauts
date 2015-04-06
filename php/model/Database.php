<?php
//  this Class are using database for representing as objects, as an object it makes easier to keep database together simpler and easier to understand
	class Database {
		private	$connection;// went we access our variable to private variable it make the class only perform only at Database
		private $host;
		private $username;
		private $password;
		private $Database;// we want to hold the $host $username $password and $Database simple 
		public $error;
	
		public function __construct($host, $username, $password, $Database){//these variable is called local variable
			$this->host = $host;// the variable here are connected to the gloal variable
			$this->username = $username;
			$this->password = $password;
			$this->Database = $Database;

			$this->connection = new mysqli($host, $username, $password);//it conects the database variable

			if($this->connection->connect_error){//
				die("<p>Error:". $this->connection->connect_error . "</p>");// the <p> is a percaution for echo the echo out
			}
			//else{
				//echo "success:  ". $connection->host_info;
			//}

			$exists = $this->connection->select_db($Database);//$exists

			if(!$exists){//the ! is invering the varible to display the echo
		 		$query =  $this->connection->query("CREATE DATABASE $Database");// $query is like a question
			 	if($query){
			 		echo "<p>successfully created Database:". $Database . "</p>";
		 		}
			}
			else{
			 	echo "Database already exists.";//if is not exist it echo this out
		 	}
		}

		public function openConnection(){
			$this->connection = new mysqli($this->host, $this->username, $this->password, $this->Database);// this function turn the private variable to public variable

			if($this->connection->connect_error){//
				die("<p>Error:". $connection->connect_error . "</p>");// the <p> is a percaution for echo the echo out
			}

		}

		public function closeConnection(){// isset are a function that tells you whether or not that i have variable in my filder
			if(isset($this->connection)) {
				$this->connection->close();


			}


		}

		public function query($string){//this function is going to open aconnection to the database, query the database, get the result whether is succeful or not and return the result
			$this->openConnection();

			$query = $this->connection->query($string);

			if(!$query){
				$this->error = $this->connection->error;

			}

			$this->closeConnection();

			return $query;

		}
	}	
