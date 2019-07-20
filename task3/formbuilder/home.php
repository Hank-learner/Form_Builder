<?php
session_start();

if (!isset($_SESSION['userlogin'])) {
    $_SESSION['pageredirected'] = "home.php";
    header("Location: index.php");
}

if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION);
    header("Location:index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="home.css">

</head>

<body>
    <nav id="navigation">
        <a class="logo" disabled></i>Form-builder</a>
        <div id="nav-right">
            <a href="home.php" class="active"><i class="fa fa-fw fa-home"></i>Forms</a>
            <a href="dashboard.php"><i class="fa fa-files-o"></i></i> Create</a>
            <a href="home.php?logout=true" id="logoutlink">logout</a>
        </div>
        <div id="smallnav-right">
            <a id="smallnav"><i class="fa fa-bars"></i></a>
        </div>
    </nav>


    <div id="bodypart">
        <h2 id="welcome"></h2>
        <hr>
        <div id="displist">

        </div>
        <div id="disptab">

        </div>
        <div id="disp">

        </div>
    </div>

    <script src="home.js"></script>
</body>

</html>