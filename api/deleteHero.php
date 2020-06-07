<?php 
    
    $id = $_GET['id'];
    
    if (isset($id)) {
        
        $conn = new mysqli('localhost', 'root', 'root', 'HEROES');

        if ($conn -> connect_errno) {

            echo $conn -> connect_errno;
        
        } else {

            $result = $conn -> query(
                "
                DELETE 
                FROM hero
                WHERE id = $id "
            );
        }
    }

    $conn -> close();

