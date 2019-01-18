// Initialize Firebase

var config = {
    apiKey: "AIzaSyBOww9toXnLSkZb90pq7ndq3ks0T3o6BCw",
    authDomain: "edms-5f36c.firebaseapp.com",
    databaseURL: "https://edms-5f36c.firebaseio.com",
    projectId: "edms-5f36c",
    storageBucket: "edms-5f36c.appspot.com",
    messagingSenderId: "884030878477"
};
firebase.initializeApp(config);

var database = firebase.database();


var employeeName = "";
var role = "";
var startDate = "";
var monthlyRate = "";

// date = "2007"
// var now = moment.duration(date).asMonths();

// console.log(now);
// // console.log(now.asMonths());
// // console.log(now.days());





$("#submit").on("click", function (event) {

    event.preventDefault();
    employeeName = $("#employeeName").val().trim();
    role = $("#role").val().trim();
    startDate = $("#startDate").val().trim();
    monthlyRate = $("#monthlyRate").val().trim();



    employeeData = {
        employeeName: employeeName,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate

    }

    database.ref().push(employeeData);




});


database.ref().on(
    "child_added",
    function (snapshot) {
        var sv = snapshot.val();
        var tblRow = ($("<tr>"));
        tblRow.addClass("row")
        console.log(sv.employeeName);
        console.log(sv.role);
        console.log(sv.startDate);
        console.log(sv.monthlyRate);

        var currDate = moment();
        //.log("my" + a);
        var startDatedb = new Date(sv.startDate);
        //var c = moment([2019, 01, 17]);
        var startDateCalc = moment(startDatedb);
        //console.log(b);
        var diffDuration = moment.duration(currDate.diff(startDateCalc));
        console.log(diffDuration);
        console.log(diffDuration.years()); //9
        console.log(diffDuration.months()); //8
        console.log(diffDuration.days()); //13

        var years = diffDuration.years();
        var months = diffDuration.months();

        totalMonths = (years * 12) + months;
        console.log(totalMonths);
        totalBilled = totalMonths * sv.monthlyRate;
        console.log(totalBilled);

        var tblempData = $("<td>");
        tblempData.addClass("col")
        var tblRole = $("<td>");
        tblRole.addClass("col");
        var tblstartDate = $("<td>");
        tblstartDate.addClass("col");
        var tblRate = $("<td>");
        tblRate.addClass("col");
        var tblMonths = $("<td>");
        tblMonths.addClass("col");
        var tblBilled = $("<td>");
        tblBilled.addClass("col");
        tblempData.html(sv.employeeName);
        tblRole.html(sv.role);
        tblstartDate.html(sv.startDate);
        tblRate.html(sv.monthlyRate);
        tblMonths.html(totalMonths);
        tblBilled.html(totalBilled);

        tblRow.append(tblempData, tblRole, tblstartDate, tblMonths, tblRate, tblBilled);


        $("#empData").append(tblRow);


        // $("#empData").append("<div class='well'><span class='member-name'> " +
        //     sv.employeeName +
        //     " </span><span class='member-email'> " + sv.role +
        //     " </span><span class='member-age'> " + sv.startDate +
        //     " </span><span class='member-comment'> " + sv.monthlyRate +
        //     " </span></div>");



        //var table = $("<table>");


        //Get the count of columns.


        //Add the header row.

        //tblData.innerhtml("Employee Name");
        //tblData.innerhtml("Role");







        // $("#tbleName").text(sv.employeeName);
        // $("#tblRole").text(sv.role);
        // $("#tblSdate").text(sv.startDate);
        // $("#tblRate").text(sv.monthlyRate);
    }
    ,
    //error handling

    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
