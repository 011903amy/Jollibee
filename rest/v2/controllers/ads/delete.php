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
  // get data
  $ads->ads_aid = $_GET['adsid'];
  checkId($ads->ads_aid);
  

  $query = checkDelete($ads);

  returnSuccess($ads, "ads", $query);
}

// return 404 error if endpoint not available
checkEndpoint();