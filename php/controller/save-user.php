<?php

require_once(__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library

$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);
//sanatize string for exp - exp4

//jquery sessionfor exp - exp4
$query = $_SESSION["connection"]->query("UPDATE users SET "
        . "exp = $exp, "
        . "exp1 = $exp1, "
        . "exp2 = $exp2, "
        . "exp3 = $exp3, "
        . "exp4 = $exp4 WHERE username = \"" . $_SESSION["name"]. "\"");


if($query){
    //echoing true
    echo "true";
}else{
    //echo for connection error
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}