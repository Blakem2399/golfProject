let coursecollection;
let numplayers;
let numholes = 18;
let theCourse = document.getElementById('courseSelect').value;
let globalTee;
let mycourse;
let totalYards = 0;
let totalPar = 0;
let inTotalYards = 0;
let inTotalPar = 0;
let outTotalYards = 0;
let outTotalPar = 0;
let p1 = [];
let p2 = [];
let p3 = [];
let p4 = [];
let p5 = [];
let p6 = [];
let p7 = [];
let p8 = [];


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
    if ((numplayers < 9) && (numplayers !== 0) && $('#teeselect').html !== '') {
        $(".left").append('<div>holes</div>');
        $(".left").append('<div>yards</div>');
        $(".left").append('<div>hcp</div>');
        $(".left").append('<div class="leftWords">par</div>');
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
function totaling() {

    for (let h = 0; h < numholes; h++) {
        let yardage = mycourse.data.holes[h].teeBoxes[globalTee].yards;
        let par = mycourse.data.holes[h].teeBoxes[globalTee].par;
        totalYards = totalYards + yardage;
        totalPar = totalPar + par;
    }
    for (let h = 0; h < 9; h++) {
        let yardage = mycourse.data.holes[h].teeBoxes[globalTee].yards;
        let par = mycourse.data.holes[h].teeBoxes[globalTee].par;
        inTotalYards = inTotalYards + yardage;
        inTotalPar = inTotalPar + par;
    }
    for (let h = 8; h < numholes; h++) {
        let yardage = mycourse.data.holes[h].teeBoxes[globalTee].yards;
        let par = mycourse.data.holes[h].teeBoxes[globalTee].par;
        outTotalYards = outTotalYards + yardage;
        outTotalPar = outTotalPar + par;
    }
}
function buildCard() {
    for (let h = 0; h < numholes; h++) {
         let handicap = mycourse.data.holes[h].teeBoxes[globalTee].hcp;
         let yardage = mycourse.data.holes[h].teeBoxes[globalTee].yards;
         let par = mycourse.data.holes[h].teeBoxes[globalTee].par;
        $(".card").append("<div id='col" + (h + 1) + "' class='cardCol'><span>" + (h + 1) + "</span>" +
            "<div>" + yardage + "</div><div>" + handicap + "</div><div>" + par + "</div></div>")
    }
    totaling();
    $(".card").append("<div id='inScore' class='cardCol end'><span>In</span>" +
        "<div>" + inTotalYards + "</div><div>H</div><div>" + inTotalPar + "</div></div>");
    $(".card").append("<div id='outScore' class='cardCol end'><span>Out</span>" +
        "<div>" + outTotalYards + "</div><div>H</div><div>" + outTotalPar + "</div></div>");
    $(".card").append("<div id='totalScore' class='cardCol end'><span>Total</span>" +
        "<div>" + totalYards + "</div><div>H</div><div>" + totalPar + "</div></div>");
    addholes();
}


function addholes() {
    for (let p = 1; p <= numplayers; p++) {
        for (let h = 1; h <= numholes; h++) {

            $("#col" + h).append("<input type='text' id='p" + p + "h" + h + "' class='hole' onkeyup='getScores(" + p +","+ h +")'> ")
        }
        $("#inScore").append("<span id='in" + p + "'></span>");
        $("#outScore").append("<span id='out" + p + "'></span>");
        $("#totalScore").append("<span id='total" + p + "'></span>");
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

function getScores(player,hole) {

    let thisScore = $("#p" + player +"h"+ hole).val();
    switch (player) {
        case 1:
            p1[hole - 1] = Number(thisScore);
            break;
        case 2:
            p2[hole - 1] = Number(thisScore);
            break;
        case 3:
            p3[hole - 1] = Number(thisScore);
            break;
        case 4:
            p4[hole - 1] = Number(thisScore);
            break;
        case 5:
            p5[hole - 1] = Number(thisScore);
            break;
        case 6:
            p6[hole - 1] = Number(thisScore);
            break;
        case 7:
            p7[hole - 1] = Number(thisScore);
            break;
        case 8:
            p8[hole - 1] = Number(thisScore);
            break;
    }




}
