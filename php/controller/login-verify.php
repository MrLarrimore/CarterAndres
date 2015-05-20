<?php

require_once (__DIR__ . "/../model/config.php");

//require once is used to find files out of the origin file, like a library
function authenticateUser() {
    if (!isset($_SESSION["authenticated"])) {
        return false;
    }
    //fuction for authenticate user
    else {
        if ($_SESSION["authenticated"] != true) {
            return false;
        }
        //if for authenticated
        else {
            return true;
        }
        //else for return true
    }
}
