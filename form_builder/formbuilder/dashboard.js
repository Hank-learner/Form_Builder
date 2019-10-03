document.getElementById('smallnav').addEventListener('click', smallnav);

function smallnav() {
  var x = document.getElementById('nav-right');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}



var username = "";

function usernameget() {
  var xmlhttp = new XMLHttpRequest();
  var formData = new FormData();
  formData.append('action', 'getusername');
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      username = xmlhttp.responseText;
    }
  };
  xmlhttp.open('POST', 'dashboardphp.php');
  xmlhttp.send(formData);
}
usernameget();



var formbuilderleft = document.getElementById("formbuilderleft");
var formbuilderright = document.getElementById("formbuilderright");

var addtextfieldbtn = document.getElementById('addtextbox');
var addnumberfieldbtn = document.getElementById('addnumberbox');
var addradiogroupbtn = document.getElementById('addradiogroup');
var addcheckboxbtn = document.getElementById('addcheckboxgroup');
var addimageinputbtn = document.getElementById('addimage');

var finishformbtn = document.getElementById('finishform');
var finishformdisplay = document.getElementById('displayfinish');

var newform = document.getElementById('newform');
var newformnamefield = document.getElementById('newformname');
var newformdescriptionfield = document.getElementById('newformdescription');
var dispnewformstatus = document.getElementById('displaynewformstatus');
var newformname;

newform.addEventListener('submit', addnewform);

function addnewform(event) {
  newformname = newformnamefield.value;
  var newformdescription = newformdescriptionfield.value;

  var xmlhttp = new XMLHttpRequest();

  var formData = new FormData();
  formData.append('newformname', newformname);
  formData.append('newformdescription', newformdescription);
  formData.append('action', 'addnewform');

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      dispnewformstatus.innerHTML = response;
      if (response == 'done') {
        newform.style.display = 'none';
        formbuilderleft.style.display = "block";
        formbuilderright.style.display = "block";
        formbuilderleft.innerHTML = "<h2>" + newformname + "</h2><hr>";
        if (newformdescription) {
          formbuilderleft.innerHTML += "<h5>About:</h5>" + newformdescription + "<hr>";
        }

      }
    }
  };
  xmlhttp.open('POST', 'dashboardphp.php');
  xmlhttp.send(formData);

  event.preventDefault();

}


addtextfieldbtn.addEventListener('click', addtextfield);
var textfieldno = 0;
var textfieldnoinform = 0;

function addtextfield() {
  textfieldno++;
  textfieldnoinform++;
  var displaynewtextfield = "<div id='divtextfield" + textfieldno + "'><hr><br><p id='headingtextfield" + textfieldno + "'data-placeholder='Insert text or question here...' contenteditable required></p><input type='text' id='textfield" + textfieldno + "' name='textfield" + textfieldno + "' required><button class='delete deltextfield' onclick='removeitemsingle(event)'>delete</button><br></div>";
  formbuilderleft.innerHTML += displaynewtextfield;
}

function rearrangetextfield() {
  for (let i = 1; i <= textfieldno; i++) {
    var textelement = document.getElementById('textfield' + i);
    if (!textelement && i == textfieldno) {
      textfieldno--;
    } else if (!textelement) {
      var k = i + 1;
      var x = 1;
      while (!(document.getElementById('divtextfield' + k))) {
        x++;
        k++;
        if ((i + x) > textfieldno) {
          break;
        }
      }
      for (let j = k; j <= textfieldno; j++) {
        var divelement = document.getElementById('divtextfield' + j);
        if (divelement) {
          divelement.id = 'divtextfield' + (j - x);
          var paragraphelement = document.getElementById('headingtextfield' + j);
          paragraphelement.id = 'headingtextfield' + (j - x);
          var textfieldelement = document.getElementById('textfield' + j);
          textfieldelement.id = 'textfield' + (j - x);
          textfieldelement.name = 'textfield' + (j - x);
        }
      }
      textfieldno -= x;
    }
  }
}



addnumberfieldbtn.addEventListener('click', addnumberfield);
var numberfieldno = 0;
var numberfieldnoinform = 0;

function addnumberfield() {
  numberfieldno++;
  numberfieldnoinform++;
  var displaynewnumberfield = "<div id='divnumberfield" + numberfieldno + "'><hr><br><p id='headingnumberfield" + numberfieldno + "'data-placeholder='Insert text or question here...' contenteditable required></p><input type='number' id='numberfield" + numberfieldno + "' name='numberfield" + numberfieldno + "' required><button class='delete delnumberfield' onclick='removeitemsingle(event)'>delete</button><br></div>";
  formbuilderleft.innerHTML += displaynewnumberfield;
}

function rearrangenumberfield() {
  for (let i = 1; i <= numberfieldno; i++) {
    var numberelement = document.getElementById('numberfield' + i);
    if (!numberelement && i == numberfieldno) {
      numberfieldno--;
    } else if (!numberelement) {
      var k = i + 1;
      var x = 1;
      while (!(document.getElementById('divnumberfield' + k))) {
        x++;
        k++;
        if ((i + x) > numberfieldno) {
          break;
        }
      }
      for (let j = k; j <= numberfieldno; j++) {
        var divelement = document.getElementById('divnumberfield' + j);
        if (divelement) {
          divelement.id = 'divnumberfield' + (j - x);
          var paragraphelement = document.getElementById('headingnumberfield' + j);
          paragraphelement.id = 'headingnumberfield' + (j - x);
          var numberfieldelement = document.getElementById('numberfield' + j);
          numberfieldelement.id = 'numberfield' + (j - x);
          numberfieldelement.name = 'numberfield' + (j - x);
        }
      }
      numberfieldno -= x;
    }
  }
}




addradiogroupbtn.addEventListener('click', addradiogroup);
var radiogroupno = 0;
var radiogroupnoinform = 0;
var radiogroups = [0];
var radiobuttonno = 0;
var radiobuttonnoinform = 0;

function addradiogroup() {
  radiogroupno++;
  radiogroupnoinform++;
  radiogroups.push(0);
  var displaynewradiogroup =
    "<div id='divradiogroup" + radiogroupno + "'><hr><br><p id='headingradiogroup" + radiogroupno + "'data-placeholder='Insert text or question here...'contenteditable required></p>          <div><input type='radio' id='radiogroup" + radiogroupno + "btnno" + ++radiogroups[radiogroupno] + "' name='radiogroup" + radiogroupno + "' value='Radio 1' required checked>   <input type='text' id='valueradiogroup" + radiogroupno + "btnno" + radiogroups[radiogroupno] + "' placeholder='Insert value here...'></div>                <div><input type='radio' id='radiogroup" + radiogroupno + "btnno" + ++radiogroups[radiogroupno] + "' name='radiogroup" + radiogroupno + "' value='Radio 2'> <input type='text' id='valueradiogroup" + radiogroupno + "btnno" + radiogroups[radiogroupno] + "' placeholder='Insert value here...'></div>                   <button class='add addradiobutton' id='addradiobuttongroup" + radiogroupno + "' onclick='addradiobutton(event," + radiogroupno + ")'>add-radiobutton</button><button class='delete delradiogroup' onclick='removeitemmultiple(event)'>delete-group</button><br></div>";
  formbuilderleft.innerHTML += displaynewradiogroup;
  radiobuttonno += 2;
  radiobuttonnoinform += 2;
}

function addradiobutton(e, radiogroupno) {
  if (e.target.classList.contains("addradiobutton")) {
    radiobuttonno++;
    radiobuttonnoinform++;
    ++radiogroups[radiogroupno];
    var divparent = e.target.parentElement;
    var div = document.createElement('div');
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "radiogroup" + radiogroupno;
    input.id = "radiogroup" + radiogroupno + "btnno" + radiogroups[radiogroupno];
    input.value = "Radio " + radiogroups[radiogroupno];
    div.appendChild(input);
    var inputvalue = document.createElement('input');
    inputvalue.type = "text";
    inputvalue.id = "valueradiogroup" + radiogroupno + "btnno" + radiogroups[radiogroupno];
    inputvalue.placeholder = "Insert value here...";
    div.appendChild(inputvalue);
    var button = document.createElement('button');
    button.className = "delete delradiobutton";
    button.setAttribute("onclick", "removeitemmultiple(event)");
    button.innerText = "delete";
    div.appendChild(button);
    divparent.insertBefore(div, document.getElementById("addradiobuttongroup" + radiogroupno));
  }
}

function rearrangeradiobuttons() {
  var numradgroups = 0;
  var setradgroups = [0];
  for (let i = 1; i <= radiogroupno; i++) {
    var divelement = document.getElementById("divradiogroup" + i);
    if (divelement) {
      numradgroups++;
      divelement.id = "divradiogroup" + numradgroups;
      var headingelement = document.getElementById("headingradiogroup" + i);
      headingelement.id = 'headingradiogroup' + numradgroups;
      var addbtnelement = document.getElementById("addradiobuttongroup" + i);
      addbtnelement.onclick = "addradiobutton(event," + numradgroups + ")";
      var numradbuttons = 0;
      for (let j = 1; j <= radiogroups[i]; j++) {
        var element = document.getElementById("radiogroup" + i + "btnno" + j);
        if (element) {
          numradbuttons++;
          element.id = "radiogroup" + numradgroups + "btnno" + numradbuttons;
          element.name = "radiogroup" + numradgroups;
          var valueelement = document.getElementById("valueradiogroup" + i + "btnno" + j);
          valueelement.id = "valueradiogroup" + numradgroups + "btnno" + numradbuttons;
        }
      }
      setradgroups.push(numradbuttons);
    }
  }
  radiogroupno = numradgroups;
  radiogroups = setradgroups;
}

addcheckboxbtn.addEventListener('click', addcheckboxgroup);
var checkboxgroupno = 0;
var checkboxgroupnoinform = 0;
var checkboxgroups = [0];
var checkboxno = 0;
var checkboxnoinform = 0;

function addcheckboxgroup() {
  checkboxgroupno++;
  checkboxgroupnoinform++;
  checkboxnoinform++;
  checkboxno++;
  checkboxnoinform++;
  checkboxgroups.push(0);
  var displaynewcheckbox =
    "<div id='divcheckboxgroup" + checkboxgroupno + "'><hr><br><p id='headingcheckboxgroup" + checkboxgroupno + "' data-placeholder='Insert text or question here...' contenteditable required></p>                                                                                                                                              <div><input type='checkbox' id='checkboxgroup" + checkboxgroupno + "boxno" + ++checkboxgroups[checkboxgroupno] + "' name='checkboxgroup" + checkboxgroupno + "boxno" + checkboxgroups[checkboxgroupno] + "' value='Checkbox 1'><input type='text' id='valuecheckboxgroup" + checkboxgroupno + "boxno" + checkboxgroups[checkboxgroupno] + "' placeholder='Insert value here...'></div>     <button class='add addcheckboxbutton' id='addcheckboxgroup" + checkboxgroupno + "' onclick='addcheckbox(event," + checkboxgroupno + ")'>add-checkbox</button><button class='delete delcheckboxgroup' onclick='removeitemmultiple(event)'>delete-group</button><br></div>";
  formbuilderleft.innerHTML += displaynewcheckbox;
}

function addcheckbox(e, checkboxgroupno) {
  if (e.target.classList.contains("addcheckboxbutton")) {
    checkboxno++;
    checkboxnoinform++;
    ++checkboxgroups[checkboxgroupno];
    var divparent = e.target.parentElement;
    var div = document.createElement('div');
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = 'checkboxgroup' + checkboxgroupno + 'boxno' + checkboxgroups[checkboxgroupno];
    input.id = "checkboxgroup" + checkboxgroupno + "boxno" + checkboxgroups[checkboxgroupno];
    input.value = "Checkbox " + checkboxgroups[checkboxgroupno];
    div.appendChild(input);
    var inputvalue = document.createElement('input');
    inputvalue.type = "text";
    inputvalue.id = "valuecheckboxgroup" + checkboxgroupno + "boxno" + checkboxgroups[checkboxgroupno];
    inputvalue.placeholder = "Insert value here...";
    div.appendChild(inputvalue);
    var button = document.createElement('button');
    button.className = "delete delcheckbox";
    button.setAttribute("onclick", "removeitemmultiple(event)");
    button.innerText = "delete";
    div.appendChild(button);
    divparent.insertBefore(div, document.getElementById("addcheckboxgroup" + checkboxgroupno));
  }
}

function rearrangecheckboxes() {
  var numchkgroups = 0;
  var setchkgroups = [0];
  for (let i = 1; i <= checkboxgroupno; i++) {
    var divelement = document.getElementById("divcheckboxgroup" + i);
    if (divelement) {
      numchkgroups++;
      divelement.id = "divcheckboxgroup" + numchkgroups;
      var headingelement = document.getElementById("headingcheckboxgroup" + i);
      headingelement.id = 'headingcheckboxgroup' + numchkgroups;
      var addbtnelement = document.getElementById("addcheckboxgroup" + i);
      addbtnelement.onclick = "addcheckbox(event," + numchkgroups + ")";
      var numchkbox = 0;
      for (let j = 1; j <= checkboxgroups[i]; j++) {
        var element = document.getElementById("checkboxgroup" + i + "boxno" + j);
        if (element) {
          numchkbox++;
          element.id = "checkboxgroup" + numchkgroups + "boxno" + numchkbox;
          element.name = "checkboxgroup" + numchkgroups + "boxno" + numchkbox;
          var valueelement = document.getElementById("valuecheckboxgroup" + i + "boxno" + j);
          valueelement.id = "valuecheckboxgroup" + numchkgroups + "boxno" + numchkbox;
        }
      }
      setchkgroups.push(numchkbox);
    }
  }
  checkboxgroupno = numchkgroups;
  checkboxgroups = setchkgroups;
}

addimageinputbtn.addEventListener('click', addimageinput);
var imageinputno = 0;
var imageinputnoinform = 0;

function addimageinput() {
  imageinputno++;
  imageinputnoinform++;
  var displaynewcheckbox =
    "<div id='divimageinput" + imageinputno + "'><hr><br><p id='headingimageinput" + imageinputno + "' data-placeholder='Insert text or question here...' contenteditable required></p>                                                <input type='file' id='imageinput" + imageinputno + "' name='imageinput" + imageinputno + "' accept='image/*' required>              <br> <button class='delete delimageinput' onclick='removeitemsingle(event)'>delete</button><br></div>";
  formbuilderleft.innerHTML += displaynewcheckbox;
}

function rearrangeimageinput() {
  for (let i = 1; i <= imageinputno; i++) {
    var imageinputelement = document.getElementById('imageinput' + i);
    if (!imageinputelement && i == imageinputno) {
      imageinputno--;
    } else if (!imageinputelement) {
      var k = i + 1;
      var x = 1;
      while (!(document.getElementById('divimageinput' + k))) {
        x++;
        k++;
        if ((i + x) > imageinputno) {
          break;
        }
      }
      for (let j = k; j <= imageinputno; j++) {
        var divelement = document.getElementById('divimageinput' + j);
        if (divelement) {
          divelement.id = 'divimageinput' + (j - x);
          var paragraphelement = document.getElementById('headingimageinput' + k);
          paragraphelement.id = 'headingimageinput' + (j - x);
          var imageinputelement = document.getElementById('imageinput' + j);
          imageinputelement.id = 'imageinput' + (j - x);
          imageinputelement.name = 'imageinput' + (j - x);
        }
      }
      imageinputno -= x;
    }
  }
}



function removeitemsingle(e) {
  if (e.target.classList.contains("deltextfield")) {

    var deletediv = e.target.parentElement;
    deletediv.parentElement.removeChild(deletediv);
    textfieldnoinform--;
    rearrangetextfield();
  } else if (e.target.classList.contains("delnumberfield")) {

    var deletediv = e.target.parentElement;
    deletediv.parentElement.removeChild(deletediv);
    rearrangenumberfield();
    numberfieldnoinform--;
  } else if (e.target.classList.contains("delimageinput")) {

    var deletediv = e.target.parentElement;
    deletediv.parentElement.removeChild(deletediv);
    imageinputnoinform--;
    rearrangeimageinput();
  }
}

function removeitemmultiple(e) {
  if (e.target.classList.contains("delradiogroup")) {

    var deletediv = e.target.parentElement;
    deletediv.parentElement.removeChild(deletediv);
    radiogroupnoinform--;
  } else if (e.target.classList.contains("delradiobutton")) {

    var deletespan = e.target.parentElement;
    deletespan.parentElement.removeChild(deletespan);
    radiobuttonnoinform--;
  } else if (e.target.classList.contains("delcheckboxgroup")) {

    var deletedivparent = e.target.parentElement.parentElement;
    var deletediv = e.target.parentElement;
    deletedivparent.removeChild(deletediv);
    checkboxgroupnoinform--;
  } else if (e.target.classList.contains("delcheckbox")) {

    var deletespan = e.target.parentElement;
    deletespan.parentElement.removeChild(deletespan);
    checkboxnoinform--;
  }
}


function resetfields() {
  newform.style.display = 'block';
  formbuilderleft.style.display = "none";
  formbuilderright.style.display = "none";
  formbuilderleft.innerHTML = "";
  dispnewformstatus.innerHTML = "To create press add new form button";
  newformnamefield.value = "";
  newformdescriptionfield.value = "";
  finishformdisplay.innerHTML = "";
  imageinputno = 0;
  imageinputnoinform = 0;
  checkboxgroupno = 0;
  checkboxgroupnoinform = 0;
  checkboxgroups = [0];
  checkboxno = 0;
  checkboxnoinform = 0;
  radiogroupno = 0;
  radiogroupnoinform = 0;
  radiogroups = [0];
  radiobuttonno = 0;
  radiobuttonnoinform = 0;
  numberfieldno = 0;
  numberfieldnoinform = 0;
  textfieldno = 0;
  textfieldnoinform = 0;
}

finishformbtn.addEventListener('click', submitformfinal);

function submitformfinal() {
  if (textfieldnoinform == 0 && numberfieldnoinform == 0 && radiogroupnoinform == 0 && checkboxgroupnoinform == 0 && imageinputnoinform == 0) {
    finishformdisplay.innerHTML = "<br>create feilds and <br> <br>then finish the form";

  } else {


    var valueempty = 0;
    var headings = document.getElementsByTagName('p');
    for (let i = 0; i < headings.length; i++) {
      var text = headings[i].innerText;
      if (!text || text == "<br>" || text == "<br><br>" || text == "<br><br><br>") {
        if (headings[i]) {
          headings[i].style.borderColor = "red";
          valueempty++;
        }
      }
    }

    for (let i = 1; i <= radiogroupno; i++) {
      for (let j = 1; j <= radiogroups[i]; j++) {

        var valuefield = document.getElementById("valueradiogroup" + i + "btnno" + j);
        if (valuefield) {
          var value = valuefield.value;
          if (!value) {
            valuefield.borderColor = "red";
            valueempty++;
          }
        }
      }
    }

    for (let i = 1; i <= checkboxgroupno; i++) {
      for (let j = 1; j <= checkboxgroups[i]; j++) {
        var valuefield = document.getElementById("valuecheckboxgroup" + i + "boxno" + j);
        if (valuefield) {
          var value = valuefield.value;
          if (!value) {
            valuefield.borderColor = "red";
            valueempty++;
          }
        }
      }
    }


    if (valueempty) {
      finishformdisplay.innerHTML = "fill all the fields and question blocks";

    } else {
      rearrangetextfield();
      rearrangenumberfield();
      rearrangeradiobuttons();
      rearrangecheckboxes();
      rearrangeimageinput();

      var xmlhttp = new XMLHttpRequest();
      var formData = new FormData();
      for (let i = 0; i < headings.length; i++) {
        if (headings[i]) {
          headings[i].contentEditable = false;
        }
      }

      for (let i = 1; i <= textfieldno; i++) {
        var id = 'headingtextfield' + i;
        var headingelement = document.getElementById(id);
        if (headingelement) {
          var headingtext = headingelement.innerText;
          formData.append(id, headingtext);
        }
      }
      for (let i = 1; i <= numberfieldno; i++) {
        var id = 'headingnumberfield' + i;
        var headingelement = document.getElementById(id);
        if (headingelement) {
          var headingtext = headingelement.innerText;
          formData.append(id, headingtext);
        }
      }
      for (let i = 1; i <= radiogroupno; i++) {
        var id = 'headingradiogroup' + i;
        var headingelement = document.getElementById(id);
        if (headingelement) {
          var headingtext = headingelement.innerText;
          formData.append(id, headingtext);
        }
      }
      for (let i = 1; i <= checkboxgroupno; i++) {
        var id = 'headingcheckboxgroup' + i;
        var headingelement = document.getElementById(id);
        if (headingelement) {
          var headingtext = headingelement.innerText;
          for (let j = 1; j <= checkboxgroups[i]; j++) {
            var valuefield = document.getElementById("valuecheckboxgroup" + i + "boxno" + j);
            if (valuefield) {
              id = 'headingcheckboxgroup' + i + 'box' + j;
              var value = valuefield.value;
              var heading = value + "   :   " + headingtext;
              formData.append(id, heading);
            }
          }
        }
      }
      for (let i = 1; i <= imageinputno; i++) {
        var id = 'headingimageinput' + i;
        var headingelement = document.getElementById(id);
        if (headingelement) {
          var headingtext = headingelement.innerText;
          formData.append(id, headingtext);
        }
      }



      for (let i = 1; i <= radiogroupno; i++) {
        for (let j = 1; j <= radiogroups[i]; j++) {
          var valuefield = document.getElementById("valueradiogroup" + i + "btnno" + j);
          if (valuefield) {
            var value = valuefield.value;
            var radiobutton = document.getElementById("radiogroup" + i + "btnno" + j);
            radiobutton.value = value;
            var parent = valuefield.parentElement;
            var span = document.createElement('span');
            span.innerText = value;
            parent.removeChild(valuefield);
            parent.appendChild(span);
          }
        }
      }
      for (let i = 1; i <= checkboxgroupno; i++) {
        for (let j = 1; j <= checkboxgroups[i]; j++) {
          var valuefield = document.getElementById("valuecheckboxgroup" + i + "boxno" + j);
          if (valuefield) {
            var value = valuefield.value;
            var checkbox = document.getElementById("checkboxgroup" + i + "boxno" + j);
            checkbox.value = value;
            var parent = valuefield.parentElement;
            var span = document.createElement('span');
            span.innerText = value;
            parent.removeChild(valuefield);
            parent.appendChild(span);
          }
        }
      }

      var deletebuttons = document.getElementsByClassName('delete');
      while (deletebuttons.length > 0) {
        deletebuttons[0].parentNode.removeChild(deletebuttons[0]);
      }
      var addbuttons = document.getElementsByClassName('add');
      while (addbuttons.length > 0) {
        addbuttons[0].parentNode.removeChild(addbuttons[0]);
      }

      var formcreated = formbuilderleft.innerHTML;

      formData.append('createdform', formcreated);
      formData.append('newformname', newformname);
      formData.append('textfieldno', textfieldno);
      formData.append('numberfieldno', numberfieldno);
      formData.append('radiogroupno', radiogroupno);
      var json_radiogroups = JSON.stringify(radiogroups);
      formData.append('radiogroups', json_radiogroups);
      formData.append('radiobuttonno', radiobuttonno);
      formData.append('checkboxgroupno', checkboxgroupno);
      var json_checkboxgroups = JSON.stringify(checkboxgroups);
      formData.append('checkboxgroups', json_checkboxgroups);
      formData.append('checkboxno', checkboxno);
      formData.append('imageinputno', imageinputno);
      formData.append('action', 'formtocreate');

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var response = xmlhttp.responseText;
          if (response == 'doneformcreation') {
            resetfields();
            alert("form created sucessfully\n URL: http://localhost/formbuilder.com/forms/" + username + "_" + newformname + ".php");
          } else {
            finishformdisplay.innerHTML = response;
          }
        }
      };
      xmlhttp.open('POST', 'dashboardphp.php');
      xmlhttp.send(formData);

    }
  }
}

var deletecreatedformbtn = document.getElementById("deletenewform");
deletecreatedformbtn.addEventListener('click', function (e) {
  if (e.target.classList.contains('delform')) {
    var xmlhttp = new XMLHttpRequest();
    var formData = new FormData();
    formData.append('newformname', newformname);
    formData.append('action', 'formtodelete');
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = xmlhttp.responseText;
        if (response == "donedeleting") {
          resetfields();
          alert("form deleted successfully");
        } else {
          finishformdisplay.innerHTML = response;
        }
      }
    }
  }
});


