<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<head>
    <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
    <link rel="shortcut icon" type="image/png" href="http://www.anztc.com/favicon.png"/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Joe Chang's Portfolio</title>
    <meta name="description" content="This is first Portfolio of Joe Chang. If you enjoy that hire me.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Joe Chang">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- jQuery-UI CSS -->
    <link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.css">
    <!-- jTable CSS -->
    <link id="jtablestylesheet" rel="stylesheet" href="css/jtableblue.css">
    <!-- Perfectscrollbar CSS -->
    <link rel="stylesheet" href="css/perfect-scrollbar.css">
    <!-- Fonts from Font Awsome -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <!-- Magnific popup -->
    <link rel="stylesheet" href="css/magnific-popup.css">

    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="css/main.css">

    <!-- Color styles -->
    <link id="colorstylesheet" rel="stylesheet" href="css/colors/blue.css">
     <!--<link rel="stylesheet" href="css/colors/yellow.css">-->
     <!--<link rel="stylesheet" href="css/colors/red.css">-->
    <!--  <link rel="stylesheet" href="css/colors/purple.css">-->
    <!--  <link rel="stylesheet" href="css/colors/orange.css">-->
    <!--  <link rel="stylesheet" href="css/colors/green.css">-->
    <script>
        function changestylesheet(){
            if ($("input[name=colorscheme]:checked").val() == "Red"){
                document.getElementById("colorstylesheet").setAttribute("href", "css/colors/red.css");
                document.getElementById("jtablestylesheet").setAttribute("href", "css/jtablered.css");
            } else if ($("input[name=colorscheme]:checked").val() == "Blue"){
                document.getElementById("colorstylesheet").setAttribute("href", "css/colors/blue.css");
                document.getElementById("jtablestylesheet").setAttribute("href", "css/jtableblue.css");
            }
        }
    </script>
    <!-- Feature detection -->
    <script src="js/modernizr-2.6.2.min.js"></script>
    <!-- Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900,300italic,400italic,600italic,700italic,900italic'
          rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Oxygen:400,700' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="js/plugins/html5shiv.js"></script>
    <script src="js/plugins/respond.min.js"></script>
    <![endif]-->
</head>
