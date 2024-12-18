<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/ads/Ads.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$ads = new Ads($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $ads->ads_start = $_GET['start'];
        $ads->ads_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($ads->ads_start, $ads->ads_total);

        $total_result = checkReadAll($ads);
        $query = checkReadLimit($ads);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $ads->ads_total,
            $ads->ads_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
