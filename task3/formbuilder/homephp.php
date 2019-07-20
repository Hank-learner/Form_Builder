<?php
include_once('sqldbconn.php');

$user = $_SESSION['userlogin'];
$usersetstable = "user_" . $user;

$formnametodisplay = $_POST['formnametodisplay'];
$formtablename = $usersetstable . "_form_" . $formnametodisplay;
$formquestiontablename = $formtablename . "_questions";
$action = $_POST["action"];
if (!$action) {
   die("<html><body><h2>please wait</h2><script type ='text/javascript'>window.location ='http://localhost/formbuilder.com/home.php'; </script></body> </html>");
}

if ($conn) {
   try {
      if ($action == 'displaywelcome') {
         echo "Welcome $user";
      } else if ($action == "displayuserforms") {

         $sql = "SELECT formname FROM $usersetstable;";
         $tabledata = mysqli_query($conn, $sql);
         $tablerows = mysqli_num_rows($tabledata);
         echo "<hr><h3>Select to view form responses</h3>";
         echo "<select name='forms' id='list' onchange = 'displayuserformtable(this.value)'>";
         echo    "<option value='select0' id='select0'>Select a group:</option>";
         $value = 1;
         for ($i = 0; $i < $tablerows; $i++) {
            $rowdata = mysqli_fetch_assoc($tabledata);
            $formname[$i] = $rowdata['formname'];
            echo "<option value='select$value' id='select$value'>$formname[$i]</option>";
            $value++;
         }
         echo "</select><br><br><hr>";
      } else if ($action == "displayselectedtable") {

         $sql = "SELECT textfieldno,numberfieldno,radiogroupno,jsonradiogroups,radiobuttonno,checkboxgroupno,jsoncheckboxgroups,checkboxno,imageinputno FROM $usersetstable WHERE formname='$formnametodisplay';";
         $usertabledata = mysqli_query($conn, $sql);
         if ($usertabledata) {

            $usertablerowdata = mysqli_fetch_assoc($usertabledata);
            $textfieldno = $usertablerowdata['textfieldno'];
            $numberfieldno = $usertablerowdata['numberfieldno'];
            $radiogroupno = $usertablerowdata['radiogroupno'];
            $radiogroups = json_decode($usertablerowdata['jsonradiogroups']);
            $radiobuttonno = $usertablerowdata['radiobuttonno'];
            $checkboxgroupno = $usertablerowdata['checkboxgroupno'];
            $checkboxgroups = json_decode($usertablerowdata['jsoncheckboxgroups']);
            $checkboxno = $usertablerowdata['checkboxno'];
            $imageinputno = $usertablerowdata['imageinputno'];

            echo "<caption><h3>$formnametodisplay</h3></caption>";
            $formlink = "http://localhost/formbuilder.com/forms/$user" . "_$formnametodisplay.php";
            echo "<a href='$formlink'><button>Go to form</button></a><br><br>
                   <input type='text' value='$formlink' id='link' readonly>
                   <div class='tooltip'>
                   <button onclick='mouseincopy()' onmouseout='mouseoutcopy()'>
                     <span class='tooltiptext' id='myTooltip'>Copy to clipboard</span>
                     Copy
                   </button>
                   </div>
                   ";

            $columnstitle = "user";
            for ($i = 1; $i <= $textfieldno; $i++) {
               $columnstitle .= ",textfield" . $i;
            }
            for ($i = 1; $i <= $numberfieldno; $i++) {
               $columnstitle .= ",numberfield" . $i;
            }
            for ($i = 1; $i <= $radiogroupno; $i++) {
               $columnstitle .= ",radiogroup" . $i;
            }
            for ($i = 1; $i <= $checkboxgroupno; $i++) {
               for ($j = 1; $j <= $checkboxgroups[$i]; $j++) {
                  $columnstitle .= ",checkboxgroup" . $i . "boxno" . $j;
               }
            }
            for ($i = 1; $i <= $imageinputno; $i++) {
               $columnstitle .= ",imageinput" . $i;
            }

            $sql = "SELECT $columnstitle FROM $formquestiontablename";
            $formquestiontabledata = mysqli_query($conn, $sql);
            $questions = "<br> <br> <table><thead><tr><th>Sl.no</th><th>user</th>";
            $formquestiontablerowdata = mysqli_fetch_assoc($formquestiontabledata);
            for ($i = 1; $i <= $textfieldno; $i++) {
               $questions .= "<th>" . $formquestiontablerowdata['textfield' . $i] . "</th>";
            }
            for ($i = 1; $i <= $numberfieldno; $i++) {
               $questions .= "<th>" . $formquestiontablerowdata['numberfield' . $i] . "</th>";
            }
            for ($i = 1; $i <= $radiogroupno; $i++) {
               $questions .= "<th>" . $formquestiontablerowdata['radiogroup' . $i] . "</th>";
            }
            for ($i = 1; $i <= $checkboxgroupno; $i++) {
               for ($j = 1; $j <= $checkboxgroups[$i]; $j++) {
                  $questions .= "<th>" . $formquestiontablerowdata['checkboxgroup'  . $i . 'boxno' . $j] . "</th>";
               }
            }
            for ($i = 1; $i <= $imageinputno; $i++) {
               $questions .= "<th>" . $formquestiontablerowdata['imageinput' . $i] . "</th>";
            }
            $questions .= "</tr></thead>";




            $sql = "SELECT $columnstitle FROM $formtablename";
            $formentrytabledata = mysqli_query($conn, $sql);
            $formentrytablerows = mysqli_num_rows($formentrytabledata);

            if ($formentrytablerows == 0) {
               echo "<h4>No responses so far</h4>";
            } else {

               $entrys = "<tbody>";
               $userentry[0] = "null";
               for ($i = 1; $i <= $formentrytablerows; $i++) {
                  $formentrytablerowdata = mysqli_fetch_assoc($formentrytabledata);

                  $entrys .= "<tr><td>$i</td>";
                  $userentry[$i] = $formentrytablerowdata['user'];
                  $usernameentry = $userentry[$i];
                  $entrys .= "<td>$userentry[$i]</td>";
                  $textfieldentry[0] = "null";
                  for ($j = 1; $j <= $textfieldno; $j++) {
                     $textfieldentry[$j] = $formentrytablerowdata['textfield' . $j];
                     $entrys .= "<td>$textfieldentry[$j]</td>";
                  }
                  $numberfieldentry[0] = 0;
                  for ($j = 1; $j <= $numberfieldno; $j++) {
                     $numberfieldentry[$j] = $formentrytablerowdata['numberfield' . $j];
                     $entrys .= "<td>$numberfieldentry[$j]</td>";
                  }
                  $radiogroupentry[0] = "null";
                  for ($i = 1; $i <= $radiogroupno; $i++) {
                     $radiogroupentry[$j] = $formentrytablerowdata['radiogroup' . $i];
                     $entrys .= "<td>$radiogroupentry[$j]</td>";
                  }
                  $checkboxgroupentry[0] = ["null"];
                  for ($i = 1; $i <= $checkboxgroupno; $i++) {
                     $checkboxgroupentry[$i][0] = "null";
                     for ($j = 1; $j <= $checkboxgroups[$i]; $j++) {
                        $checkboxgroupentry[$i][$j] = $formentrytablerowdata['checkboxgroup'  . $i . 'boxno' . $j];
                        $temp = $checkboxgroupentry[$i][$j];
                        $entrys .= "<td>$temp</td>";
                     }
                  }
                  $imageinputentry[0] = "null";
                  for ($j = 1; $j <= $imageinputno; $j++) {
                     $imageinputentry[$j] = $formentrytablerowdata['imageinput' . $j];
                     $entrys .= "<td><a href=\"forms/images/imageinput$j" . "_$usernameentry" . "_$imageinputentry[$j]\" download=\"$usernameentry\">$imageinputentry[$j]</a></td>";
                  }
                  $entrys .= "</tr>";
               }
               $entrys .= "</tbody></table><br><br>";
               echo $questions . $entrys;
            }
         } else {

            echo "No such form exists";
         }
      } else {
         echo "something is wrong";
      }
   } catch (Exception $e) {
      echo "Error :couldn't connect to database" . $e->getMessage();
      echo "please reload the page and try again";
   }
} else {
   echo "couldn't connect to the database";
}
