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
let p1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
                    $(".left").append('<div class="leftWords pName" id="name' + i + '" contenteditable="true" onkeyup="checkName(this)">' + rname + '</div>');
                },
                error: function () {
                    location.reload();
                }
            });
        }
        buildCard();

        $(".modal").fadeOut();
        $(".content").css("filter", "blur(0)");
    }
    else {
    }
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
    for (let h = 9; h < numholes; h++) {
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
            $("#col" + h).append("<input type='text' id='p" + p + "h" + h + "' class='hole' onkeyup='getScores(" + p + "," + h + ")'> ")
        }
        $("#inScore").append("<div id='in" + p + "' class='hole leftWords'></div>");
        $("#outScore").append("<div id='out" + p + "' class='hole leftWords'></div>");
        $("#totalScore").append("<div id='total" + p + "' class='hole leftWords'></div>");
    }
}


function checkName(myval) {
    $(".pName").each(function () {
        let player = $(this).html();
        if (myval === player) {
            console.log('cant use that name');
        }

    });
}

function getScores(player, hole) {
    let thisScore = $("#p" + player + "h" + hole).val();
    let scoreNumber = Number(thisScore);
    if (isNaN(scoreNumber)) {
        $("#p" + player + "h" + hole).empty();
    }
    else {
        switch (player) {
            case 1:
                p1[hole - 1] = scoreNumber;
                break;
            case 2:
                p2[hole - 1] = scoreNumber;
                break;
            case 3:
                p3[hole - 1] = scoreNumber;
                break;
            case 4:
                p4[hole - 1] = scoreNumber;
                break;
            case 5:
                p5[hole - 1] = scoreNumber;
                break;
            case 6:
                p6[hole - 1] = scoreNumber;
                break;
            case 7:
                p7[hole - 1] = scoreNumber;
                break;
            case 8:
                p8[hole - 1] = scoreNumber;
                break;
        }

        function getSum(total, num) {
            return total + num;
        }

//things get very messy past this point, must find way to iterate through the arrays. DON'T HARDCODE AGAIN
        let twat = p1.reduce(getSum);
        document.getElementById("total1").innerHTML = p1.reduce(getSum);
        document.getElementById("total2").innerHTML = p2.reduce(getSum);
        document.getElementById("total3").innerHTML = p3.reduce(getSum);
        document.getElementById("total4").innerHTML = p4.reduce(getSum);
        document.getElementById("total5").innerHTML = p5.reduce(getSum);
        document.getElementById("total6").innerHTML = p6.reduce(getSum);
        document.getElementById("total7").innerHTML = p7.reduce(getSum);
        document.getElementById("total8").innerHTML = p8.reduce(getSum);
        let in1 = p1.slice(0, 9);
        let in2 = p2.slice(0, 9);
        let in3 = p3.slice(0, 9);
        let in4 = p4.slice(0, 9);
        let in5 = p5.slice(0, 9);
        let in6 = p6.slice(0, 9);
        let in7 = p7.slice(0, 9);
        let in8 = p8.slice(0, 9);
        let out1 = p1.slice(9, 18);
        let out2 = p2.slice(9, 18);
        let out3 = p3.slice(9, 18);
        let out4 = p4.slice(9, 18);
        let out5 = p5.slice(9, 18);
        let out6 = p6.slice(9, 18);
        let out7 = p7.slice(9, 18);
        let out8 = p8.slice(9, 18);
        document.getElementById("in1").innerHTML = in1.reduce(getSum);
        document.getElementById("in2").innerHTML = in2.reduce(getSum);
        document.getElementById("in3").innerHTML = in3.reduce(getSum);
        document.getElementById("in4").innerHTML = in4.reduce(getSum);
        document.getElementById("in5").innerHTML = in5.reduce(getSum);
        document.getElementById("in6").innerHTML = in6.reduce(getSum);
        document.getElementById("in7").innerHTML = in7.reduce(getSum);
        document.getElementById("in8").innerHTML = in8.reduce(getSum);
        document.getElementById("out1").innerHTML = out1.reduce(getSum);
        document.getElementById("out2").innerHTML = out2.reduce(getSum);
        document.getElementById("out3").innerHTML = out3.reduce(getSum);
        document.getElementById("out4").innerHTML = out4.reduce(getSum);
        document.getElementById("out5").innerHTML = out5.reduce(getSum);
        document.getElementById("out6").innerHTML = out6.reduce(getSum);
        document.getElementById("out7").innerHTML = out7.reduce(getSum);
        document.getElementById("out8").innerHTML = out8.reduce(getSum);
    }
}
