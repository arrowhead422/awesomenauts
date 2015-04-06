
    

      <?php

        require_once(__DIR__ . "/control/login-verify.php");
        require_once(__DIR__ . "/view/header.php");// all these require once is what display my file and website
        if (authenticateUser()) { // the reason why we created if statment, is because we have check if the user login correctly to open up the blog-post.
          require_once(__DIR__ . "/view/navigation.php");
          require_once(__DIR__ . "/control/create-db.php");
        }
        require_once(__DIR__ . "/view/footer.php");
        require_once(__DIR__ . "/control/read-posts.php");
        
      
     
       
      ?>
    




<link rel="stylesheet" type="text/css" href="bootstrap-theme.min.css">
    <script type="text/javascript" src="//code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/alphabet.js"></script>
    <link href='http://fonts.googleapis.com/css?family=PT+Sans:400italic' rel='stylesheet' type='text/css'>
    




 <canvas id="myCanvas"></canvas>
    <script type="text/javascript" src="http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/bubbles.js"></script>
    

 






    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  
<script type="text/javaScript" src="bootstrap.min.js"></script>
<script type="text/javaScript" src="java.js"></script>
  