var json; //json is global...

function makeQuery() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                json = JSON.parse(xmlhttp.responseText);
                //myFunction(resultArr);
                //document.getElementById("locationInfo").innerHTML = xmlhttp.responseText;
                if (json.numOfRows > 0) { // something found
                    // console.log(json.numOfRows + ", " + json.rows[0].Location_name);
                    showList(json);
                }
                else {
                    document.getElementById("locationInfo").innerHTML = "<br/>Ei yrityksiä.";
                }
            }
        };
        xmlhttp.open("GET", "http://localhost:8080/companies", true);
        xmlhttp.send();
    }

function showList(json) {
    //document.getElementById("locationInfo").innerHTML = "New text!";
    var divElement = document.getElementById("locationInfo");

    var i;
    var trow;
    var d0, d1, d2, d3, d4, d5, d6, d7;
    var update, deleting;
    var table = document.createElement("table");
    table.setAttribute("class", "table table-bordered");
    divElement.appendChild(table);
    var thead = document.createElement("thead");
    var header = document.createElement("tr");
    var h0 = document.createElement("th");
    h0.innerText = "ID";
    var h1 = document.createElement("th");
    h1.innerText = "Company";
    var h2 = document.createElement("th");
    h2.innerText = "Street";
    var h3 = document.createElement("th");
    h3.innerText = "Post Code";
    var h4 = document.createElement("th");
    h4.innerText = "City";
    var h5 = document.createElement("th");
    h5.innerText = "Business ID";
    var h6 = document.createElement("th");
    h6.innerText = "Email";
    var h7 = document.createElement("th");
    h7.innerText = "Phone";
    var h8 = document.createElement("th");
    h8.innerText = "Edit or Delete";
    table.appendChild(thead);
    thead.appendChild(header);
    header.appendChild(h0);
    header.appendChild(h1);
    header.appendChild(h2);
    header.appendChild(h3);
    header.appendChild(h4);
    header.appendChild(h5);
    header.appendChild(h6);
    header.appendChild(h7);
    header.appendChild(h8);
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (i in json.rows) {
        // create a form group div
        trow = document.createElement("tr");
        trow.setAttribute("class", "del"); // mark all these dynamically created elements to be "deleted"
        tbody.appendChild(trow);
        d0 = document.createElement("td");
        d1 = document.createElement("td");
        d2 = document.createElement("td");
        d3 = document.createElement("td");
        d4 = document.createElement("td");
        d5 = document.createElement("td");
        d6 = document.createElement("td");
        d7 = document.createElement("td");
        d8 = document.createElement("td");
        d0.innerText = json.rows[i].id;
        d1.innerText = json.rows[i].name;
        d2.innerText =  json.rows[i].street;
        d3.innerText =  json.rows[i].postcode;
        d4.innerText =  json.rows[i].city;
        d5.innerText =  json.rows[i].business_id;
        d6.innerText =  json.rows[i].email;
        d7.innerText =  json.rows[i].phone;
        trow.appendChild(d0);
        trow.appendChild(d1);
        trow.appendChild(d2);
        trow.appendChild(d3);
        trow.appendChild(d4);
        trow.appendChild(d5);
        trow.appendChild(d6);
        trow.appendChild(d7);
        //ADD BUTTONS
        updating = document.createElement("a");
        updating.setAttribute("class", "btn btn-info");
        updating.setAttribute("type", "btn");
        updating.setAttribute("role", "button");
        updating.setAttribute("href", "http://127.0.0.1:8080/select/"+json.rows[i].id+'/'+json.rows[i].name+'/'+json.rows[i].street+'/'+json.rows[i].postcode+'/'+json.rows[i].city+'/'+json.rows[i].business_id+'/'+json.rows[i].email+'/'+json.rows[i].phone);
        updating.innerText = "Update";
        deleting = document.createElement("a");
        deleting.setAttribute("class", "btn btn-info");
        deleting.setAttribute("type", "btn");
        deleting.setAttribute("role", "button");
        deleting.setAttribute("href", "http://127.0.0.1:8080/delete/"+json.rows[i].id);
        deleting.innerText = "Delete";
        d8.appendChild(updating);
        d8.appendChild(deleting);
        trow.appendChild(d8);
    }
}
