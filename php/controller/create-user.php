<?php

require_once (__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
//email password and username strings

$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
//makes the password crypt random
$hashedPassword = crypt($password, $salt);
//makes the password crypt
$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "email = '',"
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt' ");


$_SESSION["name"] = $username;

//query for insert into users 
if ($query) {
    //need this for Ajax on index.php
    echo "true";
}
//echo for succesfully created user
else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
//echo for error in created user