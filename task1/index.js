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
    var delayInMilliseconds = 100;
    setTimeout(function () {
        document.getElementById("te").innerHTML = "Your daily requirement is " + parseFloat(localStorage.getItem("dr")) + " calories";

    }, delayInMilliseconds)
}


document.getElementById("inputinitials").onsubmit = function () {
    var age = parseFloat(document.getElementById("num1").value);
    var ht = parseFloat(document.getElementById("num2").value);
    var wt = parseFloat(document.getElementById("num3").value);
    var male = document.getElementById("male");
    var female = document.getElementById("female");
    if (male.checked) {
        var result = parseFloat(864) - parseFloat(parseFloat(9.72) * parseFloat(age)) + parseFloat(parseFloat(1.27) * parseFloat(parseFloat(parseFloat(14.2) * parseFloat(wt)) + parseFloat(parseFloat(503) * parseFloat(ht))));
    }
    else {
        var result = parseFloat(387) - parseFloat(parseFloat(7.31) * parseFloat(age)) + parseFloat(parseFloat(1.27) * parseFloat(parseFloat(parseFloat(10.9) * parseFloat(wt)) + parseFloat(parseFloat(660.7) * parseFloat(ht))));
    }
    if (age == 0 || ht == 0 || wt == 0)
        result = 0;
    localStorage.setItem("age", age);
    localStorage.setItem("height", ht);
    localStorage.setItem("weight", wt);
    localStorage.setItem("gender", "male");
    localStorage.setItem("dr", result);
    document.getElementById("te").innerHTML = "Your daily requirement is " + result + " calories";

}


document.getElementById("reset").onclick = function () {
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
    location.reload();

}