<?php
session_start();
$servername = "localhost";
$sqluser = "userformbuilder";
$sqlpassword = "userformbuilder1!Q";
$databasename = "formbuilder";
$conn = mysqli_connect($servername, $sqluser, $sqlpassword, $databasename);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
