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
  // check data
  checkPayload($data);
  // get data
  $ads->ads_aid = $_GET['adsid'];
  $ads->ads_title = checkIndex($data, "ads_title");
  $ads->ads_image = checkIndex($data, "ads_image");
  $ads->ads_created = date("Y-m-d H:i:s");
  $ads->ads_datetime = date("Y-m-d H:i:s");
  checkId($ads->ads_aid);

//checks current data to avoid same entries from being updated
// $ads_title_old = checkIndex($data, 'ads_title_old');
// compareTitle($ads, $ads_title_old, $ads->ads_title);
// checkId($ads->ads_aid);

  // update
  $query = checkUpdate($ads);
  returnSuccess($ads, "ads", $query);
}

// return 404 error if endpoint not available
checkEndpoint();