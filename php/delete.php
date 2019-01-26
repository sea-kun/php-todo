<?php
define("DB_USER", );
define("DB_PASS", );
try {
  $dbh = new PDO("mysql:host=127.0.0.1;dbname=todo_db;charset=utf8mb4", DB_USER, DB_PASS);
  $stmt = $dbh->prepare("DELETE FROM todos WHERE id = :id");

  $request_params = json_decode(file_get_contents('php://input'), true);
  foreach($request_params as $id) {
      $stmt->bindParam(":id", $id);
      $stmt->execute();
  }

  $result_array = [];
  foreach($dbh->query("SELECT * FROM todos") as $row) {
      $result_array[] = [
          'id'      => $row['id'],
          'title'   => $row['title'],
          'content' => $row['content']
      ];
  }

  echo json_encode($result_array);
} catch (PDOException $e) {
  die($e->getMessage());
} finally {
  $dbh = null;
}