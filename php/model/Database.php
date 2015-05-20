<?php

class Database {

//my database class
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

//database for connection, host, username, password, database, and error
    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
//construct function for host, usename, password, database
        $this->connection = new mysqli($host, $username, $password);
//pulls password and stuff from the database
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
//if for connection error
        $exsists = $this->connection->select_db($database);
//this is for select database
        if (!$exsists) {
            $query = $this->connection->query("CREATE DATABASE $database");
//if for create database
            if ($query) {
                echo "<p>Successfully created database: " . $database . "</p>";
            }
            //query for successfully created database
        } else {
            echo "<p></p>";
        }
        //echo with paragraph tags
    }

    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
// functionn for open connection

        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
        //if for connection error
    }

    public function closeConnection() {

        if (isset($this->connection)) {
            $this->connection->close();
        }
        //function for close connection
    }

    public function query($string) {
        $this->openConnection();

        $query = $this->connection->query($string);
        //query for connecection
        if (!$query) {
            $this->error = $this->connection->error;
        }
//query for close connection
        $this->closeConnection();
//for close conection
        return $query;
    }

//function for query
}
