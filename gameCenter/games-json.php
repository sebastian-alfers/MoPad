<?php

$games = array();
$games['games'][] = array('id' => 1, 'name' => 'Move the box 1');
$games['games'][] = array('id' => 2,'name' => 'Move the box 2 - game Pad');
$games['games'][] = array('id' => 3, 'name' => 'Move the box 3 - accelerometer');

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($games);