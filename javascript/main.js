function addplayers() {
    let numplayers = $(".numinput").val();
    for (let i = 1; i <= numplayers; i++) {
        $(".content").append('<div>player' + i + '</div>')

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
function loadCourse() {
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
    xhttp.open("GET", "filename", true);
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
    for (let i = 1; i<= numholes; i++){
        $(".card").append("<div id='col" + i + "' class='cardCol'>"+ i +"</div>")
    }
}
