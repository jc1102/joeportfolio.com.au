<?php
/**
 * Created by PhpStorm.
 * User: joech_000
 * Date: 26/03/14
 * Time: 3:07 PM
 */

/* Connect to database */
$con = mysql_connect("localhost", "baseonco_joe", "625518Cz") or die("Unable to connect to MySQL");
mysql_select_db("baseonco_joeportfolio", $con);

/* Insert input to database */
$sql="INSERT INTO portfolio_visitor_messageboard (vt_name, vt_phone, vt_message)
VALUES ('$_POST[visitorName]','$_POST[visitorPhone]','$_POST[visitorMessage]')";

/* error process */
if (!mysql_query($sql,$con))
{
    die('Error: ' . mysql_error($con));
}
echo "message added";

mysql_close($con);

?>