<?php

/*
$myFile = "testFile.txt";
$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = json_encode($_SERVER);
//$stringData = json_encode($_GET);
fwrite($fh, $stringData);
$stringData = json_encode($_POST);
fwrite($fh, $stringData);
fclose($fh);
*/


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');



echo json_encode(array('pin' => rand(0, 999)));