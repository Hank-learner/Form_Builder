document.getElementById('smallnav').addEventListener('click', smallnav);

function smallnav() {
  var x = document.getElementById('nav-right');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

function mouseincopy() {
  var copyText = document.getElementById('link');
  copyText.select();
  document.execCommand('copy');

  var tooltip = document.getElementById('myTooltip');
  tooltip.innerHTML = 'Copied';
}

function mouseoutcopy() {
  var tooltip = document.getElementById('myTooltip');
  tooltip.innerHTML = 'Copy to clipboard';
}






var displaywelcome = document.getElementById('welcome');
var displaytable = document.getElementById('disptab');
var displaylist = document.getElementById('displist');

function xmlhttprequest(formdata, display) {
  var xmlhttp = new XMLHttpRequest();
  var formData = new FormData();
  formData = formdata;
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      display.innerHTML = xmlhttp.responseText;
    }
  };
  xmlhttp.open('POST', 'homephp.php');
  xmlhttp.send(formData);
}

function welcomemessage() {
  var formData = new FormData();
  formData.append('action', 'displaywelcome');
  xmlhttprequest(formData, displaywelcome);

}
welcomemessage();

function displayformslist() {
  var formData = new FormData();
  formData.append('action', 'displayuserforms');
  xmlhttprequest(formData, displaylist);
}
displayformslist();

function displayuserformtable(value) {
  if (value == 'select0') {
    displaytable.innerHTML = '';
  } else {
    var formname = document.getElementById(value).innerHTML;
    var formData = new FormData();
    formData.append('formnametodisplay', formname);
    formData.append('action', 'displayselectedtable');
    xmlhttprequest(formData, displaytable);
  }
}