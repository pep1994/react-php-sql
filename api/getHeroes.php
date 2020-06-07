<?php  

    header('Content-Type: application/json');

    $conn = new mysqli('localhost', 'root', 'root', 'HEROES');

    if ($conn -> connect_errno) {
        echo json_encode('connessione fallita ' . $conn -> connect_errno );
        return;
    } else {

        $contentType = isset($_SERVER["CONTENT_TYPE"])  ? trim($_SERVER["CONTENT_TYPE"]) : '';

        if ($contentType === "application/json") {
      
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);

            if ($decoded !== null) {

                $name = $decoded['name'];
                $date = $decoded['date'];
                $important = $decoded['important'];
                $post_hero = $conn -> query(
                    "
                    INSERT INTO `hero` (`id`, `name`, `date`, `important`)
                    VALUES (NULL, '$name', '$date', $important)
                    "    
                );
            }
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

   