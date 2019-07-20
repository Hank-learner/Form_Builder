var form = document.getElementById('form');
form.addEventListener("submit", limit);
var daily;
function limit(e) {
    e.preventDefault();
    daily = document.getElementById('limitfield').value;
    document.getElementById('waterlevel').style.display = "block";
}
document.getElementById('addwater').addEventListener("click", add);
var waterlevel = 0;
var barlevel = 0;
function add() {
    waterlevel += 200;

    if (waterlevel > daily) waterlevel = daily;
    barlevel = 100 * waterlevel / daily;
    document.getElementById('level').style.width = barlevel + "%";
    document.getElementById('level').innerText = barlevel + "%";

}