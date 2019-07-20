<?php
include_once('sqldbconn.php');

$user = $_SESSION['userlogin'];
$usersetstable = "user_" . $user;


$action = $_POST["action"];
if (!$action) {
    die("<html><body><h2>please wait</h2><script type ='text/javascript'>window.location ='http://localhost/formbuilder.com/dashboard.php'; </script></body> </html>");
}

$usercreatedform = $_POST['createdform'];

$textfieldno = $_POST['textfieldno'];
$numberfieldno = $_POST['numberfieldno'];
$radiogroupno = $_POST['radiogroupno'];
$radiogroups = json_decode($_POST['radiogroups']);
$radiobuttonno = $_POST['radiobuttonno'];
$checkboxgroupno = $_POST['checkboxgroupno'];
$checkboxgroups = json_decode($_POST['checkboxgroups']);
$checkboxno = $_POST['checkboxno'];
$imageinputno = $_POST['imageinputno'];


$newformname = $_POST['newformname'];
$newformdescription = $_POST['newformdescription'];

$newformnameentry = "user_" . $user . "_form_" . $newformname;


if ($conn) {
    try {
        if ($action == 'getusername') {
            echo "$user";
        } else if ($action == "addnewform") {
            if (strlen($newformname) <= 255 && strlen($newformname) > 0) {
                if (file_exists("forms/$user" . "_" . "$newformname.php")) {
                    echo "cannot create form:form already in the name exits,<br>try another name with atleast one charachter different";
                } else {
                    if (mysqli_real_escape_string($conn, $_POST['newformname']) == $newformname && !preg_match('/\s/', $newformname)) {
                        $myfile =  fopen("forms/$user" . "_" . "$newformname.php", "w") or die("Unable to open file!");
                        $text = "test";
                        fwrite($myfile, $text);
                        fclose($myfile);
                        echo "done";
                    } else {
                        echo "special charachters and spaces are not allowed for the formname";
                    }
                }
            } else {
                preg_match('/\s/', $newformname);
                echo "please enter form name in the field";
            }
        } else if ($action == "formtocreate") {
            try {

                $myfilelink = "$user" . "_" . "$newformname.php";
                $myfilelinkforphp = "$user" . "_$newformname" . "php.php";
                $myfile = fopen("forms/$myfilelink", "w") or die("Unable to open file!");
                $txthtmlmodel = "<!DOCTYPE html>
                        <html lang='en'>
                        
                        <head>
                            <meta charset='UTF-8'>
                            <meta name='viewport' content='width=device-width,initial-scale=1.0'>
                            <meta http-equiv='X-UA-Compatible' content='ie=edge'>
                            <title>Form</title>

                            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
                            <link href ='https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap' rel='stylesheet'>
                            <link  rel='stylesheet'  href='common.css'> 

                        </head>

                        <body>
                             <nav id='navigation'>
                             <a class='logo active'>Form-builder</a>
                             <div id='nav-right'>
                             <a  href='../home.php'><i class='fa fa-fw fa-home'></i> Forms</a>
                              <a href='../dashboard.php'> <i class='fa fa-files-o'></i> Create</a>
                        ";
                $text = "<?php
                            session_start();
                            if (!isset(\$_SESSION['userlogin'])){
                                \$_SESSION['pageredirected'] = 'forms/$myfilelink';
                                header('Location:../index.php');
                            }
                            if (isset(\$_GET['logout'])) {
                                session_destroy();
                                unset(\$_SESSION);
                                header('Location:../index.php');
                            }
                            ?>
                            $txthtmlmodel 
                            <a href='$myfilelink?logout=true' id='logoutlink'> logout</a>
                               </div>
                               <div id='smallnav-right'>
                               <a id='smallnav'><i class='fa fa-bars'></i></a> 
                              </div> 
                            </nav>
                             
                              <form id='fillupform' action='$myfilelinkforphp' method='post' enctype='multipart/form-data'>
                              $usercreatedform
                              <br><input type='submit' name='submit' value='Submit Responses'>
                              </form>
                              <br><br><br><br>
                            </body>
                            </html>";
                fwrite($myfile, $text);
                fclose($myfile);
                chmod("forms/$myfilelink", 0777);
                $myfilephplink = "forms/$myfilelinkforphp";
                $myfilephp = fopen("$myfilephplink", "w") or die("Unable to open file!");
                $txt = "<?php
                            session_start();
                            if (!isset(\$_SESSION['userlogin'])){
                                header('Location:../index.php');
                            }
                            if (isset(\$_GET['logout'])) {
                                session_destroy();
                                unset(\$_SESSION);
                                header('Location:../index.php');
                            }
                            if(\$_POST['submit'] != 'Submit Responses') {
                                die (\"<html><body><h2>please wait</h2><script type ='text/javascript'>window.location ='http://localhost/formbuilder.com/forms/$myfilelink'; </script></body> </html>\");
                            }

                            \$servername ='localhost';
                            \$sqluser ='userformbuilder';
                            \$sqlpassword ='userformbuilder1!Q';
                            \$databasename = 'formbuilder';
                            \$conn = mysqli_connect(\$servername, \$sqluser, \$sqlpassword, \$databasename);
                            if (!\$conn) {
                            die('Connection failed:'  . mysqli_connect_error());
                            }

                            try{
                            \$user = \$_SESSION['userlogin'];
                            \$usersetstable =  'user_'.\$user;

                            \$sqlform = \"SELECT textfieldno,numberfieldno,radiogroupno,jsonradiogroups,radiobuttonno,checkboxgroupno,jsoncheckboxgroups,checkboxno,imageinputno FROM $usersetstable WHERE formname='$newformname';\";
                            \$usertabledata = mysqli_query(\$conn, \$sqlform);
                            if (\$usertabledata) {
                   
                               \$usertablerowdata = mysqli_fetch_assoc(\$usertabledata);
                               \$textfieldno = \$usertablerowdata['textfieldno'];
                               \$numberfieldno = \$usertablerowdata['numberfieldno'];
                               \$radiogroupno = \$usertablerowdata['radiogroupno'];
                               \$radiogroups = json_decode(\$usertablerowdata['jsonradiogroups']);
                               \$radiobuttonno = \$usertablerowdata['radiobuttonno'];
                               \$checkboxgroupno = \$usertablerowdata['checkboxgroupno'];
                               \$checkboxgroups = json_decode(\$usertablerowdata['jsoncheckboxgroups']);
                               \$checkboxno = \$usertablerowdata['checkboxno'];
                               \$imageinputno = \$usertablerowdata['imageinputno'];}
                               else{die('error in the databaase');}
                            

                            \$columnsdata=\"'\$user'\";
                            for(\$i=1;\$i<=\$textfieldno;\$i++){
                                \$text =\$_POST['textfield'.\$i];
                                \$columnsdata .=\",'\" . \$text. \"'\" ;
                            }
                            for(\$i=1;\$i<=\$numberfieldno;\$i++){
                                \$number =\$_POST['numberfield'.\$i];
                                \$columnsdata .=\",\" . \$number;
                            }
                            for (\$i = 1; \$i <= \$radiogroupno; \$i++) {
                                \$radiovalue=\$_POST['radiogroup'.\$i];
                                \$columnsdata .= \",'\" . \$radiovalue. \"'\" ;
                            }
                            for (\$i = 1; \$i <= \$checkboxgroupno; \$i++) {
                                for (\$j = 1; \$j <= \$checkboxgroups[\$i]; \$j++) {
                                    if(isset(\$_POST['checkboxgroup'.\$i .'boxno' .\$j])){
                                        \$checkboxvalue=\$_POST['checkboxgroup'.\$i .'boxno' .\$j];
                                    }else{\$checkboxvalue='-';}
                                    \$columnsdata .= \",'\" . \$checkboxvalue. \"'\" ;
                                }
                            }
                            for (\$i = 1; \$i <= \$imageinputno; \$i++) {
                                \$basename=basename(\$_FILES['imageinput'.\$i]['name']);
                                \$target_file = \"images/imageinput\$i\".\"_\$user\".\"_\" . \$basename;
                                \$imagetypeok=1;
                                \$imagesizeok=1;
                                \$filepresent=1;
                                \$imagefiletype= strtolower(pathinfo(\$target_file,PATHINFO_EXTENSION));
                                \$check = getimagesize(\$_FILES['imageinput'.\$i]['tmp_name']);
                                if(\$check !== false) {        
                                    if (\$_FILES['imageinput'.\$i]['size'] > 500000) {
                                        \$imagesizeok = 0;
                                        break;
                                    }
                                    if(\$imagefiletype != \"jpg\" && \$imagefiletype != \"png\" && \$imagefiletype != \"jpeg\") {
                                        \$imagetypeok = 0;
                                    }
                                } else {
                                    \$filepresent = 0;
                                }
                                if (\$filepresent == 0) {
                                    die (\"<h2>Your inputs were unable to submit: \$i image  is empty.</h2>\");
                                }else if(\$imagesizeok==0){
                                    die(\"<h2>Your inputs were unable to submit: \$i image  is big.</h2>\");
                                }else if(\$imagetypeok==0){
                                    die(\"<h2>Your inputs were unable to submit: \$i file not an image but $imagefiletype file.</h2>\");
                                } else {
                                    if (move_uploaded_file(\$_FILES['imageinput'.\$i]['tmp_name'], \$target_file)) { \$columnsdata.=   \",'\" . \$basename. \"'\";      chmod(\$targetfile, 0777);                         
                                    } else {
                                        die ('<h2>Sorry, there was an error uploading your file.</h2>');
                                    }
                                }
                            } 

                            echo \"$txthtmlmodel 
                                   <a href='$myfilelinkforphp?logout=true' id='logoutlink'> logout</a>
                               </div>
                               <div id='smallnav-right'>
                               <a id='smallnav'><i class='fa fa-bars'></i></a> 
                              </div> 
                            </nav>
                            <div> 
                            \";
                            \$sqlstmt=\"INSERT INTO $newformnameentry VALUES (\$columnsdata);\";
                            if(mysqli_query(\$conn, \$sqlstmt)){
                                echo \"<div id='displaystatus'><h3>Your responses were submitted</h3></div>
                                  </body>
                                  </html> \";
                            }else{
                                 echo \"<div id='displaystatus'><h3>Unable to submit form :<br>Please fill all fields and give required details</h3></div>
                                  </body>
                                  </html> \";
                            }
                            }
                            catch (Exception \$e){
                                echo \"$txthtmlmodel
                                        <a href='$myfilelinkforphp?logout=true' id='logoutlink'> logout</a>
                                        </div>
                                        <div id='smallnav-right'>
                                        <a id='smallnav'><i class='fa fa-bars'></i></a> 
                                        </div> 
                                        </nav>
                                        <div>
                                       
                                       </div id='displaystatus'><h3> Your inputs were unable to submit <br><br>
                                        Error: couldn \'t connect to database\" . \$e->getMessage() . \"</h3></div>
                                       </body>
                                       </html>\";

                            }
                        
                        ?>";
                fwrite($myfilephp, $txt);
                fclose($myfilephp);
                chmod($myfilephplink, 0777);
                $json_radiogroups = json_encode($radiogroups);
                $json_checkboxgroups = json_encode($checkboxgroups);
                $sql = "INSERT INTO $usersetstable VALUES ('$newformname',$textfieldno,$numberfieldno,$radiogroupno,'$json_radiogroups',$radiobuttonno,$checkboxgroupno,'$json_checkboxgroups',$checkboxno,$imageinputno);";
                mysqli_query($conn, $sql);

                $columns = "user TEXT not null";
                $questioncolumns = "user TEXT";
                $questioncolumnsdata = "'1'";
                for ($i = 1; $i <= $textfieldno; $i++) {
                    $columns .= ", textfield$i TEXT";
                    $questioncolumns .= ", textfield$i TEXT";
                    $headingtextfield = $_POST['headingtextfield' . $i];
                    if (!$headingtextfield)
                        $headingtextfield = "deleted question";
                    $questioncolumnsdata .= ", '$headingtextfield'";
                }
                for ($i = 1; $i <= $numberfieldno; $i++) {
                    $columns .= ", numberfield$i BIGINT";
                    $questioncolumns .= ", numberfield$i TEXT";
                    $headingnumberfield = $_POST['headingnumberfield' . $i];
                    if (!$headingnumberfield)
                        $headingnumberfield = "deleted question";
                    $questioncolumnsdata .= ", '$headingnumberfield'";
                }
                for ($i = 1; $i <= $radiogroupno; $i++) {
                    $columns .= ", radiogroup$i TEXT";
                    $questioncolumns .= ", radiogroup$i TEXT";
                    $headingradiogroup = $_POST['headingradiogroup' . $i];
                    if (!$headingradiogroup)
                        $headingradiogroup = "deleted question";
                    $questioncolumnsdata .= ", '$headingradiogroup'";
                }
                for ($i = 1; $i <= $checkboxgroupno; $i++) {
                    for ($j = 1; $j <= $checkboxgroups[$i]; $j++) {
                        $columns .= ", checkboxgroup$i" . "boxno$j TEXT";
                        $questioncolumns .= ", checkboxgroup$i" . "boxno$j TEXT";
                        $postname = 'headingcheckboxgroup' . $i . 'box' . $j;
                        $headingcheckbox = $_POST[$postname];
                        if (!$headingcheckbox)
                            $headingcheckbox = "deleted question";
                        $questioncolumnsdata .= ", '$headingcheckbox'";
                    }
                }
                for ($i = 1; $i <= $imageinputno; $i++) {
                    $columns .= ", imageinput$i TEXT";
                    $questioncolumns .= ", imageinput$i TEXT";
                    $headingimageinput = $_POST['headingimageinput' . $i];
                    if (!$headingimageinput)
                        $headingimageinput = "deleted question";
                    $questioncolumnsdata .= ", '$headingimageinput'";
                }

                $sql = "CREATE TABLE $newformnameentry($columns);";
                mysqli_query($conn, $sql);
                $newformnamequestions = $newformnameentry . "_questions";
                $sql = "CREATE TABLE $newformnamequestions($questioncolumns);";
                mysqli_query($conn, $sql);
                $sql = "INSERT INTO $newformnamequestions VALUES ($questioncolumnsdata);";
                mysqli_query($conn, $sql);
                echo "doneformcreation";
            } catch (Exception $e) {

                unlink("forms/$user" . "_" . "$newformname.php") or die("Couldn't create form with this name");
                echo "unable to create form <br> please reload the page and try again";
            }
        } else if ($action == "formtodelete") {

            unlink("forms/$user" . "_" . "$newformname.php") or die("Couldn't delete file");
            unlink("forms/$user" . "_" . "$newformname" . "php" . ".php") or die("Couldn't delete file");
            echo "donedeleting";
        }
    } catch (Exception $e) {

        echo "Error :couldn't connect to database" . $e->getMessage();
        echo "please reload the page and try again";
    }
} else {

    echo "couldn't connect to the database";
}
