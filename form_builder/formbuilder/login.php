<?php
include_once('sqldbconn.php');

$usernameget = $_POST["username"];
$emailget = $_POST["email"];
$passwordget = $_POST["password"];

if (!$usernameget) {
    die("<html><body><h2>please wait</h2><script type ='text/javascript'>window.location ='http://localhost/formbuilder.com/index.php'; </script></body> </html>");
}

$username = mysqli_real_escape_string($conn, $_POST["username"]);
$email = mysqli_real_escape_string($conn, $_POST["email"]);
$password = mysqli_real_escape_string($conn, $_POST["password"]);


if ($username != $usernameget || preg_match('/\s/', $usernameget)) {
    die("<div class='danger'>Unable to create user <br> username should not contain special charachters and spaces </div><br>");
} elseif ($email != $emailget || preg_match('/\s/', $emailget)) {
    die("<div class='danger'>Unable to create user <br>email should not contain special charachters and spaces</div><br>");
} elseif ($password != $passwordget || preg_match('/\s/', $passwordget)) {
    die("<div class='danger'>Unable to create user <br>password should not contain special charachters and spaces</div><br>");
}



if ($email) {
    $hashpassword = password_hash($password, PASSWORD_BCRYPT);
    $sqlins = "INSERT INTO userdetails VALUES ('$username','$email','$hashpassword');";
    try {
        if (strlen($username) > 4 && strlen($email) > 4 && strlen($password) > 7) {
            if ($conn) {
                $sql = "CREATE TABLE user_$username (
                        formname text not null,
                        textfieldno int,
                        numberfieldno int,
                        radiogroupno int,
                        jsonradiogroups text,
                        radiobuttonno int,
                        checkboxgroupno int,
                        jsoncheckboxgroups text,
                        checkboxno int,
                        imageinputno int
                        );";
                if (mysqli_query($conn, $sql)) {
                    mysqli_query($conn, $sqlins);
                    echo "
                    <div class='success'> User successfully created</div><br>";
                } else {
                    echo "<div class='danger'><li>unable to create user </li> <br><li>user already exists</li><br><li>Try any other username</li></div><br>";
                }
            } else {
                echo "<div class='danger'>unable to create user  <br>" . mysqli_error($conn) . "</div>";
            }
        } else {
            echo "<div class='danger'>Fill all the fields with required lengths</div><br>";
        }
    } catch (Exception $e) {
        echo "<div class='danger'> please fill all fields <br>" . $e->getMessage() . "</div><br>";
    }
} else {

    $sql = "SELECT username,email,password FROM userdetails;";
    try {
        if (strlen($username) > 4 && strlen($password) > 7) {
            $userdetailstable = mysqli_query($conn, $sql);
            $userdetailsrows = mysqli_num_rows($userdetailstable);

            for ($i = 0; $i < $userdetailsrows; $i++) {
                $userdetailsrowdata = mysqli_fetch_assoc($userdetailstable);
                $userdetailsusername[$i] = $userdetailsrowdata['username'];
                $userdetailsemail[$i] = $userdetailsrowdata['email'];
                $userdetailspassword[$i] = $userdetailsrowdata['password'];
                if (($username == $userdetailsusername[$i] || $username == $userdetailsemail[$i]) && password_verify($password, $userdetailspassword[$i])) {
                    if (isset($_SESSION['pageredirected'])) {
                        $page = $_SESSION['pageredirected'];
                    } else {
                        $page = "home.php";
                    }
                    $_SESSION['userlogin'] = $userdetailsusername[$i];
                    echo "<div class='success'>logging in please wait</div><div id='hidden'>$page</div><br>";
                } else {
                    echo "<div class='danger'>invalid user credentials</div><br>";
                }
            }
        } else {
            echo "<div class='danger'>invalid user credentials</div><br>";
        }
    } catch (Exception $e) {
        echo "<div class='danger'>please fill all the fields correctly <br> " . $e->getMessage() . "</div><br>";
    }
}
