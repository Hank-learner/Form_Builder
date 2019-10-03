<?php
session_start();

if (!isset($_SESSION['userlogin'])) {
    $_SESSION['pageredirected'] = "dashboard.php";
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
    <title>Dashboard</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="dashboard.css">

</head>

<body>
    <nav id="navigation">
        <a class="logo" disabled></i>Form-builder</a>
        <div id="nav-right">
            <a href="home.php"><i class="fa fa-fw fa-home"></i>Forms</a>
            <a href="dashboard.php" class="active"><i class="fa fa-files-o"></i></i> Create</a>
            <a href="dashboard.php?logout=true" id="logoutlink">logout</a>
        </div>
        <div id="smallnav-right">
            <a id="smallnav"><i class="fa fa-bars"></i></a>
        </div>
    </nav>
    <div>
        <form id="newform">
            <h2>Create new form</h2>
            <input type="text" id="newformname" minlength="1" maxlength="255" required="true" placeholder="Form name*">
            <br>Special charachters and spaces in forname is not allowed<br><br>
            <textarea rows="10" cols="30" id="newformdescription" placeholder="Description (optional)"></textarea>
            <br><br>
            <div id="displaynewformstatus">To create press add new form button</div>

            <input type="submit" value="add new form">
        </form>
    </div>
    <div id="formbuilderleft">

    </div>

    <div id="formbuilderright">
        <h2>ADD to form</h2>

        <button id="addtextbox">Text-Box</button>
        <br><br>
        <button id="addnumberbox">Number-Field</button>
        <br> <br>
        <button id="addradiogroup">Radio-btn-group</button>
        <br> <br>
        <button id="addcheckboxgroup">check-box</button>
        <br> <br>
        <button id="addimage">Image-input</button>
        <br> <br>
        <br> <br>
        <button id="finishform">Finish-up</button>
        <br>
        <div id="displayfinish"></div>
        <br><br>
        <button class="delete delform" id="deletenewform">Delete Form</button>
    </div>

    <script src="dashboard.js"></script>
</body>

</html>