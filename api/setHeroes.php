<?php 

    $conn = new mysqli('localhost', 'root', 'root', 'HEROES');

    $id = $_GET['id'];
    $imp = $_GET['imp'];

    if ($conn -> connect_errno) {
        echo json_encode('errore nella connessione' . $conn -> connect_errno);
        return;
    } else {

        if (isset($id) && isset($imp)) {
            
            if ($imp == true) {
                $imp = 0;    
            } else {
                $imp = 1;
            }

            $q = $conn -> query(
                "
                UPDATE `hero` 
                SET `important` = '$imp' 
                WHERE `id` = $id
                "
            );
        }

        $result = $conn -> query(
            "
            SELECT *
            FROM hero
            "
        );

        if ($result -> num_rows < 1) {
            echo json_encode('risultato non trovato');
            return;
        } else {

            $res = [];
            $row = $result -> fetch_assoc();

            while ($row !== null) {
                $res [] = $row; 
                $row = $result -> fetch_assoc();
            }

            echo json_encode($res);
        }
    }

    $conn -> close();



