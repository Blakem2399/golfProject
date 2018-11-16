function addplayers() {
    let numplayers = $(".numinput").val();
    $(".left").append('<div>holes</div>');
    $(".left").append('<div>yards</div>');
    $(".left").append('<div>hcp</div>');
    for (let i = 1; i <= numplayers; i++) {
        let rname = '';
        $.ajax({
            url: 'https://randomuser.me/api/?nat=us',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                rname = data.results[0].name.first +" "+data.results[0].name.last;
                $(".left").append('<div>'+ rname +'</div>');
            }
        });



    }
    $(".modal").fadeOut();
    $(".content").css("filter", "blur(0)");

}
let coursecollection;
let numplayers = 0;
let numholes = 18;
(function () {
  loadDoc();
})();
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            coursecollection = JSON.parse(this.responseText);
            console.log(coursecollection);
            xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
            xhttp.send();
        }
    };
}
function loadCourse(courseid) {
    var xhttp = new xhttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            mycourse = JSON.parse(this.responseText);
            console.log(mycourse);

            let teearray = mycourse.data.holes[0].teeBoxes;
            for (let i = 0; i < teearray.length; i++) {
                $('#teeselect').append("<option value='" + i +"'>" + teearray[i].teeType + "</option>");

            }

            document.getElementById("demo").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/"+courseid, true);
    xhttp.send();
}
function addholes() {
    for (let p = 1; p <= numplayers; p++) {
        for (let h = 1; h <= numholes; h++){
        $("#col" + h).append("<input type='text' id='p"+ p + " h " + h + " '> ")
    }
    }
}
function buildCard() {
    for (let i = 0; i<= numholes; i++){
        $(".card").append("<div id='col" + i+1 + "' class='cardCol'><span>"+ i +"</span>" +
        "<div> mycourse.data.holes[i].teeboxes[globaltee].yards</div>" +


           + "</div>")
    }
}
function chooseTee(teevalue) {
    globalTee = teevalue;
    buildCard();
}
function checkName(myval) {

    $(".pname").each(function () {
        let player = $(this).html();
        if (myval === player) {
            console.log('cant use that name');
        }

    });
}
