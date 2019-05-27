// function javascriptload(){
var foods = [], carbs = [], prots = [], fatss = [], totss = [];
var required = parseFloat(0);
if (!isNaN(parseFloat(localStorage.getItem("age")))) {
    document.getElementById("num1").value = "" + parseFloat(localStorage.getItem("age"));
    document.getElementById("num2").value = "" + parseFloat(localStorage.getItem("height"));
    document.getElementById("num3").value = "" + parseFloat(localStorage.getItem("weight"));
    if (localStorage.getItem("gender") === "female") {
        document.getElementById("female").checked = true;
    }
    else {
        document.getElementById("male").checked = true;
    }
    var delayInMilliseconds = 200;
    setTimeout(function () {
        document.getElementById("te").innerHTML = "Your daily requirement is " + parseFloat(localStorage.getItem("dr")) + " calories";

    }, delayInMilliseconds)
}

if (!isNaN(parseFloat(localStorage.getItem("req")))) {
    var delayInMilliseconds = 200;
    document.getElementById("chkreq").title = "";
    required = parseFloat(localStorage.getItem("req"));

    setTimeout(function () {
        document.getElementById("requirement").innerHTML = "Requirement set for " + parseFloat(localStorage.getItem("req")) + " calories";
        document.getElementById("require").value = "" + parseFloat(localStorage.getItem("req"));

    }, delayInMilliseconds)
}
if (localStorage.getItem('foods')) {
    var test1 = [], test2 = [], test3 = [], test4 = [], test5 = [];
    test1 = JSON.parse(localStorage['foods']);
    test2 = JSON.parse(localStorage['carbs']);
    test3 = JSON.parse(localStorage['fatss']);
    test4 = JSON.parse(localStorage['prots']);
    test5 = JSON.parse(localStorage['totss']);
    var k = parseInt(test1.length);
    var x = document.getElementById("distab");
    x.style.display = "block";
    for (let l = 0; l < k; l++) {
        var rows = "<td>" + test1[l] + "</td><td>" + test2[l] + "</td><td>" + test3[l] + "</td><td>" + test4[l] + "</td><td>" + test5[l] + "</td>";
        var tbody = document.querySelector("#disptab tbody");
        var tr = document.createElement("tr");
        tr.innerHTML = rows;
        tbody.appendChild(tr);
    }
}
else {
    console.log("no earlier food data");

}







function calculateTE() {
    var age = parseFloat(document.getElementById("num1").value);
    var ht = parseFloat(document.getElementById("num2").value);
    var wt = parseFloat(document.getElementById("num3").value);
    var male = document.getElementById("male");
    var female = document.getElementById("female");
    if (!isNaN(age) && !isNaN(ht) && !isNaN(wt)) {
        if (male.checked) {
            var result = parseFloat(864) - parseFloat(parseFloat(9.72) * parseFloat(age)) + parseFloat(parseFloat(1.27) * parseFloat(parseFloat(parseFloat(14.2) * parseFloat(wt)) + parseFloat(parseFloat(503) * parseFloat(ht))));
            if (age == 0 || ht == 0 || wt == 0)
                result = 0;

            if (!isNaN(result)) {
                document.getElementById("te").innerHTML = "";
                localStorage.setItem("age", age);
                localStorage.setItem("height", ht);
                localStorage.setItem("weight", wt);
                localStorage.setItem("gender", "male");
                localStorage.setItem("dr", result);
                var delayInMilliseconds = 200;

                setTimeout(function () {
                    document.getElementById("te").innerHTML = "Your daily requirement is " + result + " calories";
                }, delayInMilliseconds);
            }

            else {
                document.getElementById("te").innerHTML = "";
                var delayInMilliseconds = 200;

                setTimeout(function () {
                    document.getElementById("te").innerHTML = "fill all the details correctly";
                }, delayInMilliseconds);
            }
        }

        else if (female.checked) {
            var result = parseFloat(387) - parseFloat(parseFloat(7.31) * parseFloat(age)) + parseFloat(parseFloat(1.27) * parseFloat(parseFloat(parseFloat(10.9) * parseFloat(wt)) + parseFloat(parseFloat(660.7) * parseFloat(ht))));
            if (age == 0 || ht == 0 || wt == 0)
                result = 0;

            if (!isNaN(result)) {
                document.getElementById("te").innerHTML = "";
                localStorage.setItem("age", age);
                localStorage.setItem("height", ht);
                localStorage.setItem("weight", wt);
                localStorage.setItem("gender", "female");
                localStorage.setItem("dr", result);
                var delayInMilliseconds = 200;

                setTimeout(function () {
                    document.getElementById("te").innerHTML = "Your daily requirement is " + result + " calories";
                }, delayInMilliseconds);
            }

            else {
                document.getElementById("te").innerHTML = "";
                var delayInMilliseconds = 200;

                setTimeout(function () {
                    document.getElementById("te").innerHTML = "fill all the details correctly";
                }, delayInMilliseconds);
            }
        }

        else {
            document.getElementById("te").innerHTML = "";
            var delayInMilliseconds = 300;

            setTimeout(function () {
                document.getElementById("te").innerHTML = "fill the gender correctly";
            }, delayInMilliseconds);
        }
    }
    else {
        document.getElementById("te").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("te").innerHTML = "Please fill all the fields with correct details";
        }, delayInMilliseconds);
    }
}
function rese() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("num3").value = "";
    document.getElementById("male").checked = true;
    document.getElementById("te").innerHTML = "";
    localStorage.removeItem("age");
    localStorage.removeItem("height");
    localStorage.removeItem("weight");
    localStorage.removeItem("dr");
    localStorage.removeItem("gender");

}



function getreq() {
    var req = parseFloat(document.getElementById("require").value);

    if (!isNaN(req)) {
        required = parseFloat(req);
        document.getElementById("chkreq").title = "";
        localStorage.setItem("req", req);

        document.getElementById("requirement").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("requirement").innerHTML = "Requirement set for " + req + " calories";
        }, delayInMilliseconds);

    }
    else {
        document.getElementById("requirement").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("requirement").innerHTML = "Please fill the Requirement and then click the button ";
        }, delayInMilliseconds);
    }
}


var totcal = parseFloat(0);
var totpro = parseFloat(0), totcar = parseFloat(0), totfat = parseFloat(0);

function alertSubmit() {
    var item = document.getElementById("fooditem").value;
    var pro = parseFloat(document.getElementById("prot").value);
    var car = parseFloat(document.getElementById("carb").value);
    var fat = parseFloat(document.getElementById("fats").value);


    if (!isNaN(pro) && !isNaN(car) && !isNaN(fat)) {
        if (item === "") {
            document.getElementById("le").innerHTML = "";
            var delayInMilliseconds = 200;

            setTimeout(function () {
                document.getElementById("le").innerHTML = "Fill the name of the food";
            }, delayInMilliseconds);
        }

        else {
            var cal = parseFloat(pro) + parseFloat(car) + parseFloat(fat);
            var cal = parseFloat(pro) + parseFloat(car) + parseFloat(fat);
            document.getElementById("le").innerHTML = "Your inputs were submitted, total calories=" + cal + " for " + item;
            if (localStorage.getItem("totcals")) {
                totcal = parseFloat(localStorage.getItem("totcals"));
                totpro = parseFloat(localStorage.getItem("totpros"))
                totcar = parseFloat(localStorage.getItem("totcars"));
                totfat = parseFloat(localStorage.getItem("totfats"));

            }

            document.getElementById("fooditem").value = "";
            document.getElementById("fats").value = "";
            document.getElementById("prot").value = "";
            document.getElementById("carb").value = "";

            totcal = parseFloat(totcal) + parseFloat(cal);
            localStorage.setItem("totcals", totcal);

            totpro = parseFloat(totpro) + parseFloat(pro);
            localStorage.setItem("totpros", totpro);

            totcar = parseFloat(totcar) + parseFloat(car);
            localStorage.setItem("totcars", totcar);

            totfat = parseFloat(totfat) + parseFloat(fat);
            localStorage.setItem("totfats", totfat);
            document.getElementById("lef").innerHTML = "";
            document.getElementById("rea").innerHTML = "";

            var x = document.getElementById("distab");

            x.style.display = "block";

            var rows = "<td>" + item + "</td><td>" + car + "</td><td>" + fat + "</td><td>" + pro + "</td><td>" + cal + "</td>";
            var tbody = document.querySelector("#disptab tbody");
            var tr = document.createElement("tr");
            tr.innerHTML = rows;
            tbody.appendChild(tr);

            if (localStorage.getItem('foods')) {
                foods = JSON.parse(localStorage['foods']);
                carbs = JSON.parse(localStorage['carbs']);
                prots = JSON.parse(localStorage['prots']);
                fatss = JSON.parse(localStorage['fatss']);
                totss = JSON.parse(localStorage['totss']);
            }
            else {
                console.log("no earlier food data");

            }

            foods.push(item);
            carbs.push(car);
            prots.push(pro);
            fatss.push(fat);
            totss.push(cal);
            var JSONreadyfoods = JSON.stringify(foods);
            var JSONreadycarbs = JSON.stringify(carbs);
            var JSONreadyprots = JSON.stringify(prots);
            var JSONreadyfatss = JSON.stringify(fatss);
            var JSONreadytotss = JSON.stringify(totss);

            localStorage.setItem('foods', JSONreadyfoods);
            localStorage.setItem('carbs', JSONreadycarbs);
            localStorage.setItem('prots', JSONreadyprots);
            localStorage.setItem('fatss', JSONreadyfatss);
            localStorage.setItem('totss', JSONreadytotss);


        }


    }

    else {
        document.getElementById("le").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("le").innerHTML = "Fill all the details on the food correctly";
        }, delayInMilliseconds);

    }



}
function show() {
    if (!isNaN(parseFloat(localStorage.getItem("totcals")))) {

        document.getElementById("lef").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("lef").innerHTML = "Total calories taken so far = " + localStorage.getItem("totcals") + " cal<br>" + "carbhohydrates=" + localStorage.getItem("totcars") + " cal <br>   fats=" + localStorage.getItem("totfats") + " cal <br>  protiens=" + localStorage.getItem("totpros") + " cal";

        }, delayInMilliseconds);


    }
    else {
        document.getElementById("lef").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("lef").innerHTML = "Total calories taken so far = " + totcal + " cal<br>" + " Please fill out some foods";

        }, delayInMilliseconds);
    }
}
function sho() {

    if (required === 0) {
        document.getElementById("rea").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("rea").innerHTML = "Fill out the Daily requirement field above";

        }, delayInMilliseconds);
    }

    else {
        if (parseFloat(localStorage.getItem("totcals")) >= parseFloat(localStorage.getItem("req"))) {

            document.getElementById("rea").innerHTML = "";
            var delayInMilliseconds = 200;

            setTimeout(function () {
                document.getElementById("rea").innerHTML = "Daily Requirement Satisfied";

            }, delayInMilliseconds);
        }
        else if (parseFloat(localStorage.getItem("totcals")) === 0) {
            document.getElementById("rea").innerHTML = "";
            var delayInMilliseconds = 200;

            setTimeout(function () {
                document.getElementById("rea").innerHTML = "Please fill foods";

            }, delayInMilliseconds);

        }
        else {
            document.getElementById("rea").innerHTML = "";
            var delayInMilliseconds = 200;

            setTimeout(function () {
                document.getElementById("rea").innerHTML = "Daily Requirement Unsatisfied <br> Eat and add some foods to the table";

            }, delayInMilliseconds);

        }
    }


}
function reetab(){
    localStorage.removeItem("foods");
    localStorage.removeItem("carbs");
    localStorage.removeItem("fatss");
    localStorage.removeItem("prots");
    localStorage.removeItem("totss");
    localStorage.removeItem("totcals");
    localStorage.removeItem("totcars");
    localStorage.removeItem("totpros");
    localStorage.removeItem("totfats");
    location.reload();
}
function rstpg() {
    localStorage.clear();
    location.reload();
}





// }