// function javascriptload(){


function calculateTE()
{
    var age=document.getElementById("num1").value;
    var ht=document.getElementById("num2").value;
    var wt=document.getElementById("num3").value;
    var male=document.getElementById("male");
    var female=document.getElementById("female");

    if(male.checked){
        var result=parseFloat(864)-parseFloat(parseFloat(9.72)*parseFloat(age))+parseFloat(parseFloat(1.27)*parseFloat(parseFloat(parseFloat(14.2)*parseFloat(wt))+parseFloat(parseFloat(503)*parseFloat(ht)))); 
        if(age==0 || ht==0 || wt==0)
        result=0;

         if(!isNaN(result))
            {document.getElementById("te").innerHTML="Your daily requirement is " +result +" calories";}
            
         else
            {window.alert("Enter correct details");}
    }
           
    else if(female.checked){
        var result=parseFloat(387)-parseFloat(parseFloat(7.31)*parseFloat(age))+parseFloat(parseFloat(1.27)*parseFloat(parseFloat(parseFloat(10.9)*parseFloat(wt))+parseFloat(parseFloat(660.7)*parseFloat(ht)))); 
                if (age == 0 || ht == 0 || wt == 0)
                    result = 0;

        if(!isNaN(result))
            {document.getElementById("te").innerHTML="Your daily requirement is " +result +" calories";} 

        else
            {
                window.alert("Enter correct details");
            }
    }

    else
        {window.alert("something is wrong please reload the page");
    }
}


var totcal= parseFloat(0);

function alertSubmit() {
    var item = document.getElementById("fooditem").value;
    var pro = document.getElementById("prot").value;
    var car = document.getElementById("carb").value;
    var fat = document.getElementById("fats").value;
    var totpro,totcar,totfat;
    
    if (!isNaN(pro) && !isNaN(car) && !isNaN(fat))
    {

                var cal = parseFloat(pro) + parseFloat(car) + parseFloat(fat);
                var cal = parseFloat(pro) + parseFloat(car) + parseFloat(fat);
                window.alert("Your inputs were submitted, total calories=" + cal + " for " + item);

        document.getElementById("fooditem").value = "";
        document.getElementById("fats").value = "";
        document.getElementById("prot").value = "";
        document.getElementById("carb").value = "";
        totcal = parseFloat(totcal) + parseFloat(cal);

            }

    else{
        window.alert("enter full and correct details");
    }



}
function show()
{
    if(!NaN(totcal))
    {
    window.alert("Total calories sor far =" + totcal);}
    else {
        window.alert("enter full and correct details");
    }
}






// }