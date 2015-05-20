<?php

require_once(__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
unset($_SESSION["authenticated"]);
//unset for authenticated 
session_destroy();
header("Location: " . $path . "index.php");
//shuts down people from posting without an account