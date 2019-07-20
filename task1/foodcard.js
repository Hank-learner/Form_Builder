var lstab = ['foods', 'carbs', 'fatss', 'prots', 'totss'];
var lsdisp = ['totcals', 'totcars', 'totfats', 'totpros'];
var test = [];
var delayInMilliseconds = 200;
var x = document.getElementById('distab');
var y = document.getElementById('requ');

if (!isNaN(parseFloat(localStorage.getItem('req')))) {
  document.getElementById('chkreq').title = '';
  required = parseFloat(localStorage.getItem('req'));
  y.style.display = 'block';
  document.getElementById('requirement').innerHTML =
    'Requirement set for ' +
    parseFloat(localStorage.getItem('req')) +
    ' calories';
  document.getElementById('require').value =
    '' + parseFloat(localStorage.getItem('req'));
}

if (localStorage.getItem('foods')) {
  for (let i = 0; i < 5; i++) {
    test[i] = [];
    test[i] = JSON.parse(localStorage[lstab[i]]);
  }
  var k = parseInt(test[1].length);
  x.style.display = 'block';
  for (let l = 0; l < k; l++) {
    var rows =
      '<td>' +
      test[0][l] +
      '</td><td>' +
      test[1][l] +
      '</td><td>' +
      test[2][l] +
      '</td><td>' +
      test[3][l] +
      '</td><td>' +
      test[4][l] +
      '</td><td>' +
      '<button class="delitem">Delete-item</button>' +
      '</td>';
    var tbody = document.querySelector('#disptab tbody');
    var tr = document.createElement('tr');
    tr.innerHTML = rows;
    tbody.appendChild(tr);
  }
}

var itemlist = document.querySelector('#disptbody');
itemlist.addEventListener('click', removeItem);
function removeItem(e) {
  if (e.target.classList.contains('delitem')) {
    var li = e.target.parentElement.parentElement;
    var index = test[0].indexOf(li.firstElementChild.innerHTML);
    for (let i = 0; i < 5; i++) {
      if (i < 3) {
        localStorage.setItem(
          lsdisp[i + 1],
          parseFloat(localStorage.getItem(lsdisp[i + 1])) -
          parseFloat(test[i + 1][index])
        );
      }
      if (i == 0) {
        localStorage.setItem(
          lsdisp[0],
          parseFloat(localStorage.getItem(lsdisp[0])) -
          parseFloat(test[4][index])
        );
      }
      test[i].splice(index, 1);
      var JSONreadylstabtemp = JSON.stringify(test[i]);
      localStorage.setItem(lstab[i], JSONreadylstabtemp);
    }
    itemlist.removeChild(li);
  }
  if (!isNaN(itemlist.innerHTML)) {
    x.style.display = 'none';
  }

  document.getElementById('lef').innerHTML = '';
  document.getElementById('rea').innerHTML = '';
}

document.getElementById('reqinp').onsubmit = function () {
  var req = parseFloat(document.getElementById('require').value);
  required = parseFloat(req);
  document.getElementById('chkreq').title = '';
  localStorage.setItem('req', req);
  var y = document.getElementById('requ');
  y.style.display = 'block';
  document.getElementById('requirement').innerHTML =
    'Requirement set for ' + req + ' calories';
};

var totals = [0, 0, 0, 0];
var totcal = parseFloat(0);
var totpro = parseFloat(0), totcar = parseFloat(0), totfat = parseFloat(0);
document.getElementById('formfd').onsubmit = function () {
  let singitemid = ['fooditem', 'carb', 'fats', 'prot'];
  var singitem = singitemid.map(function (item) {
    return document.getElementById(item).value;
  });
  var cal =
    parseFloat(singitem[1]) +
    parseFloat(singitem[2]) +
    parseFloat(singitem[3]);
  document.getElementById('le').innerHTML =
    'Your inputs were submitted, total calories=' + cal + ' for ' + singitem[0];

  for (let i = 1; i < 5; i++) {
    if (localStorage.getItem('totpros'))
      totals[i] = parseFloat(localStorage.getItem(lsdisp[i]));
    if (i == 4)
      localStorage.setItem(
        lsdisp[0],
        parseFloat(totals[0]) + parseFloat(cal)
      );
    else
      localStorage.setItem(
        lsdisp[i],
        parseFloat(totals[i]) + parseFloat(singitem[i])
      );
  }
  let numfield = ['fooditem', 'fats', 'prot', 'carb'];
  numfield.forEach(function (item) {
    document.getElementById(item).value = '';
  });

  document.getElementById('lef').innerHTML = '';
  document.getElementById('rea').innerHTML = '';
  x.style.display = 'block';

  var rows =
    '<td>' +
    singitem[0] +
    '</td><td>' +
    singitem[2] +
    '</td><td>' +
    singitem[3] +
    '</td><td>' +
    singitem[1] +
    '</td><td>' +
    cal +
    '</td><td>' +
    '<button class="delitem">Delete-item</button>' +
    '</td>';
  var tbody = document.querySelector('#disptab tbody');
  var tr = document.createElement('tr');
  tr.innerHTML = rows;
  tbody.appendChild(tr);
  var lstabtemp = [];
  var JSONreadylstabtemp = [];
  for (let i = 0; i < 5; i++) {
    lstabtemp[i] = [];
    if (localStorage.getItem('totss'))
      lstabtemp[i] = JSON.parse(localStorage[lstab[i]]);
    if (i != 4) lstabtemp[i].push(singitem[i]);
    else lstabtemp[4].push(cal);
    JSONreadylstabtemp[i] = [];
    JSONreadylstabtemp[i] = JSON.stringify(lstabtemp[i]);
    localStorage.setItem(lstab[i], JSONreadylstabtemp[i]);
  }
};

document.getElementById('totalcalories').onclick = function () {
  document.getElementById('lef').innerHTML = '';
  setTimeout(function () {
    if (!isNaN(parseFloat(localStorage.getItem('totcals')))) {
      document.getElementById('lef').innerHTML =
        'Total calories taken so far = ' +
        (parseFloat(localStorage.getItem('totcars')) + parseFloat(localStorage.getItem('totfats')) + parseFloat(localStorage.getItem('totpros'))) +
        ' cal<br>' +
        'carbhohydrates=' +
        localStorage.getItem('totcars') +
        ' cal <br>   fats=' +
        localStorage.getItem('totfats') +
        ' cal <br>  protiens=' +
        localStorage.getItem('totpros') +
        ' cal';
    } else {
      document.getElementById('lef').innerHTML =
        'Total calories taken so far = ' +
        totcal +
        ' cal<br>' +
        ' Please fill out some foods';
    }
  }, delayInMilliseconds);
};

document.getElementById('chkreq').onclick = function () {
  document.getElementById('rea').innerHTML = '';
  setTimeout(function () {
    if (
      parseFloat(localStorage.getItem('totcals')) >=
      parseFloat(localStorage.getItem('req'))
    ) {
      document.getElementById('rea').innerHTML = 'Daily Requirement Satisfied';
    } else {
      document.getElementById('rea').innerHTML =
        'Daily Requirement Unsatisfied <br>Please Eat and add some foods to the table';
    }
  }, delayInMilliseconds);
};

document.getElementById('retab').onclick = function () {
  if (confirm('Are you sure to delete the list of food?')) {
    let tabcl = [
      'foods',
      'carbs',
      'fatss',
      'prots',
      'totss',
      'totcals',
      'totcars',
      'totpros',
      'totfats',
    ];
    tabcl.forEach(function (item) {
      localStorage.removeItem(item);
    });
    location.reload();
  }
};
document.getElementById('resst').onclick = function () {
  if (confirm('Are you sure to erase all details and start again?')) {
    localStorage.clear();
    location.reload();
  }
};
