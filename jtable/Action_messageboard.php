<?php
/**
 * Created by PhpStorm.
 * User: joechang
 * Date: 18/11/13
 * Time: 3:23 PM
 */

try {
    /* Open database connection */
    $con = mysql_connect("localhost", "baseonco_joe", "625518Cz") or die("Unable to connect to MySQL");
    mysql_select_db("baseonco_joeportfolio", $con);

    /* Getting records (listAction) */
    if ($_GET["action"] == "list") {

        /* Get records from database */
        $select_statement = "SELECT vt_id, vt_name, vt_phone, vt_message FROM portfolio_visitor_messageboard";


        $where = "";
        $isWhere = false;

        if (isset($_POST["filterName"]) && strlen($_POST["filterName"]) > 0) {
            $isWhere = true;
            $where .= " WHERE vt_name = '" . $_POST["filterName"] . "' ";
        }

        if (isset($_POST["filterPhone"]) && strlen($_POST["filterPhone"]) > 0) {

            if (!$isWhere) {
                $isWhere = true;
                $where .= " WHERE vt_phone = '" . $_POST["filterPhone"] . "' ";
            } else {

                $where .= " AND vt_phone = '" . $_POST["filterPhone"] . "' ";
            }

        }

        $sql = $select_statement . ' ' . $where . ' ORDER BY ' . $_GET['jtSorting'];
        $result = mysql_query($sql);


        /* Add all records to an array */
        $rows = array();
        while ($row = mysql_fetch_assoc($result)) {
            $rows[] = $row;
        }

        /* Return result to jTable */
        $jTableResult = array();
        $jTableResult['Result'] = "OK";
        $jTableResult['TotalRecordCount'] = count ($rows);
        $jTableResult['Records'] = $rows;
        print json_encode($jTableResult);

    }

    /* Close database connection */
    mysql_close($con);
} catch (Exception $ex) {
    //Return error message
    $jTableResult = array();
    $jTableResult['Result'] = "ERROR";
    $jTableResult['Message'] = $ex->getMessage();
    $jTableResult['sql'] = $sql;

    print json_encode($jTableResult);
}

?>
