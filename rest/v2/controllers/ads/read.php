<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$ads = new Ads($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("adsid", $_GET)) {
  $ads->ads_aid = $_GET['adsid'];
  checkId($ads->ads_aid);
  $query = checkReadById($ads);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($ads);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();