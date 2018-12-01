let coursecollection;
let numplayers;
let numholes = 18;
let theCourse = document.getElementById('courseSelect').value;
let globalTee;
let mycourse;

(function () {
    loadDoc();
})();

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            coursecollection = JSON.parse(this.responseText);
            console.log(coursecollection);
            xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
            xhttp.send();
        }
    };
}

function addplayers() {

    globalTee = $('#teeselect').val();
    numplayers = $(".numinput").val();
    if ((numplayers !== 0) && $('#teeselect').html !== '') {
        $(".left").append('<div>holes</div>');
        $(".left").append('<div class="leftWords">yards</div>');
        $(".left").append('<div class="leftWords">hcp</div>');
        for (let i = 1; i <= numplayers; i++) {
            let rname = '';
            $.ajax({
                url: 'https://randomuser.me/api/?nat=us',
                dataType: 'json',
                success: function (data) {
                    rname = data.results[0].name.first;
                    $(".left").append('<div class="leftWords" contenteditable="true" onkeyup="checkName()">' + rname + '</div>');
                }
            });
        }
        buildCard();

        $(".modal").fadeOut();
        $(".content").css("filter", "blur(0)");
    }
    else {}
}

function loadCourse(courseid) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            mycourse = JSON.parse(this.responseText);
            console.log(mycourse);
            $('#teeselect').empty();
            let teearray = mycourse.data.holes[0].teeBoxes;
            for (let i = 0; i < teearray.length; i++) {
                $('#teeselect').append("<option value='" + i + "'>" + teearray[i].teeType + "</option>");
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + courseid, true);
    xhttp.send();
}

function buildCard() {
    for (let h = 0; h < numholes; h++) {
         let handicap = mycourse.data.holes[h].teeBoxes[globalTee].hcp;
         let yardage = mycourse.data.holes[h].teeBoxes[globalTee].yards;
        $(".card").append("<div id='col" + (h + 1) + "' class='cardCol'><span>" + (h + 1) + "</span>" +
            "<div>" + yardage + "</div><div>" + handicap + "</div></div>")
    }
    addholes();
}


function addholes() {
    for (let p = 1; p <= numplayers; p++) {
        for (let h = 1; h <= numholes; h++) {
            $("#col" + h).append("<input type='text' id='p" + p + " h " + h + " ' class='hole'> ")
        }
    }
}



function checkName(myval) {

    $(".pname").each(function () {
        let player = $(this).html();
        if (myval === player) {
            console.log('cant use that name');
        }

    });
}
