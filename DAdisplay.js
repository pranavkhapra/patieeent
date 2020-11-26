var shownamed = document.getElementById("displaybox")
var respd = " "
var url = window.location.origin + "/seedocAppointments"

console.log(url)
var request1 = new XMLHttpRequest()
request1.open('GET', url)
request1.onload = () => {
    var respd = JSON.parse(request1.response)
    //shownamed.innerHTML=respd
    // respd= request1.response;
    var i;
    var str = "";
    for (i = 0; i < respd.length; i++) {
        str = (str + (i + 1) + " Name: " + respd[i].details.fname + " " + respd[i].details.lname + " </br>Age:" 
        + respd[i].details.age + " </br>Chronic Disease: " + respd[i].details.chr_disease + 
        " </br>Allergy: " + respd[i].details.allergy + "</br>Problem:  " + 
        respd[i].details.problem + "</br>Date and Time: " + respd[i].time +  "</br>" );
    }
    if (respd.length != 0) {
        shownamed.innerHTML = str
    }
}
request1.send()

var myVar = setInterval(myTimer, 25000);

function myTimer() {
    var request1 = new XMLHttpRequest()
    request1.open('GET', url)
    request1.onload = () => {
        // respd= request1.response;
        // shownamed.innerHTML=respd
        // respd= request1.response;
        var respd = JSON.parse(request1.response)
        var i;
        var str = "";
        for (i = 0; i < respd.length; i++) {
            str = (str + (i + 1) + " Name: " + respd[i].details.fname + " " + respd[i].details.lname + " </br>Age:" 
            + respd[i].details.age + " </br>Chronic Disease: " + respd[i].details.chr_disease + 
            " </br>Allergy: " + respd[i].details.allergy + "</br>Problem:  " + 
            respd[i].details.problem + "</br>Date and Time: " + respd[i].time +  "</br>" );
        }

        if (respd.length != 0) {
        shownamed.innerHTML = str
        }
    }
    request1.send()
}

