var json; //json is global...

function makeQuery2() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = JSON.parse(xmlhttp.responseText);
            if (json.numOfRows > 0) { // something found
                showId(json);
            }
            else {
                console.log("No ID found!");
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8080/create", true);
    xmlhttp.send();
}

makeQuery2();

function showId(json) {
    var idInput = document.getElementById("id");
    idInput.setAttribute("value", json.rows[0].id);
}

