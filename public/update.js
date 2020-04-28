var json; //json is global...

function makeQuery2() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = xmlhttp.responseText;
            console.log("hi json: ");
            if (json.numOfRows > 0) { // something found
                showValues(json);
                console.log("I found request!");
            }
            else {
                console.log("No company found by this ID!");
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8080/select/:id", true);
    xmlhttp.send();
};

makeQuery2();


function showValues(json) {
    var id = document.querySelector("id");
    var name = document.getElementById("name");
    var street = document.getElementById("street");
    var postcode = document.getElementById("postcode");
    var city = document.getElementById("city");
    var businesss_id = document.getElementById("businesss_id");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");

    id.setAttribute("value", "Moimoi");
    name.setAttribute("value", json.rows[0].name);
    street.setAttribute("value", json.rows[0].street);
    postcode.setAttribute("value", json.rows[0].postcode);
    city.setAttribute("value", json.rows[0].city);
    businesss_id.setAttribute("value", json.rows[0].businesss_id);
    email.setAttribute("value", json.rows[0].email);
    phone.setAttribute("value", json.rows[0].phone);
}

