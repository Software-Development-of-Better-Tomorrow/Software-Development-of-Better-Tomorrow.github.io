<?php
    header("Content-type: text/plain");

    $rawDataToSaveToFile = $_POST['contentRawData'];
    $filePath = $_POST['contentRawDataStorageFilePath'];
    
    file_put_contents($filePath, $rawDataToSaveToFile, LOCK_EX);
?>