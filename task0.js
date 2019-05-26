// function javascriptload(){
var required = parseFloat(0);
for (let i = 0; i < (localStorage.length) - (localStorage.length - 1); i++) {
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
        document.getElementById("chkreq").disabled = false;
        document.getElementById("chkreq").title = "";
        required =parseFloat(localStorage.getItem("req"));
    
        setTimeout(function () {
            document.getElementById("requirement").innerHTML = "Requirement set for " + parseFloat(localStorage.getItem("req")) + " calories";
            document.getElementById("require").value = "" + parseFloat(localStorage.getItem("req"));

        }, delayInMilliseconds)
    }


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
        document.getElementById("chkreq").disabled = false;
        document.getElementById("chkreq").title="";
        localStorage.setItem("req", req);

        document.getElementById("requirement").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("requirement").innerHTML = "Requirement set for " + req + " calories";
        }, delayInMilliseconds);

    }
    else {
        document.getElementById("requirement").innerHTML = "";
        document.getElementById("chkreq").disabled = true;

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

            document.getElementById("fooditem").value = "";
            document.getElementById("fats").value = "";
            document.getElementById("prot").value = "";
            document.getElementById("carb").value = "";
            totcal = parseFloat(totcal) + parseFloat(cal);
            totpro = parseFloat(totcal) + parseFloat(pro);
            totcar = parseFloat(totcar) + parseFloat(car);
            totfat = parseFloat(totfat) + parseFloat(fat);
            document.getElementById("lef").innerHTML = "";
            document.getElementById("rea").innerHTML = "";

            var rows = "<td>" + item + "</td><td>" + car + "</td><td>" + fat + "</td><td>" + pro + "</td>";
            var tbody = document.querySelector("#disptab tbody");
            var tr = document.createElement("tr");
            tr.innerHTML = rows;
            tbody.appendChild(tr);
            var foods = [], carbs = [], prots = [], fatss = [];
            foods = JSON.parse(localStorage['foods']);
            carbs = JSON.parse(localStorage['carbs']);
            prots = JSON.parse(localStorage['prots']);
            fatss = JSON.parse(localStorage['fatss']);
            foods.push(item);
            carbs.push(car);
            prots.push(pro);
            fatss.push(fat);
            var JSONreadyfoods = JSON.stringify(foods);
            var JSONreadycarbs = JSON.stringify(carbs);
            var JSONreadyprots = JSON.stringify(prots);
            var JSONreadyfatss = JSON.stringify(fatss);
            localStorage.setItem('foods', JSONreadyfoods);
            localStorage.setItem('carbs', JSONreadycarbs);
            localStorage.setItem('prots', JSONreadyprots);
            localStorage.setItem('fatss', JSONreadyfatss);

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
    if (!isNaN(totcal)) {

        document.getElementById("lef").innerHTML = "";
        var delayInMilliseconds = 200;

        setTimeout(function () {
            document.getElementById("lef").innerHTML = "Total calories taken so far =" + totcal + "<br>" + "carbhohydrates=" + totcar + " cal <br>   fats=" + totfat + " cal <br>  protiens=" + totpro + " cal";

        }, delayInMilliseconds); d


    }
    else {
        window.alert("enter full and correct details");
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
        if (totcal >= required) {

            document.getElementById("rea").innerHTML = "";
            var delayInMilliseconds = 200;

            setTimeout(function () {
                document.getElementById("rea").innerHTML = "Daily Requirement Satisfied";

            }, delayInMilliseconds);
        }
        else if(totcal===0) {
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
                document.getElementById("rea").innerHTML = "Daily Requirement Unsatisfied";

            }, delayInMilliseconds);

        }
    }


}





// }