
var config = {
  apiKey: "AIzaSyCE55R0IOt8NaggNHjdmHPtAO37L-1I2aQ",
  authDomain: "train-schedule-2815c.firebaseapp.com",
  databaseURL: "https://train-schedule-2815c.firebaseio.com",
  projectId: "train-schedule-2815c",
  storageBucket: "train-schedule-2815c.appspot.com",
  messagingSenderId: "216058169006"
};
firebase.initializeApp(config);

var database = firebase.database();


// Capture Button Click
$("#add-space-train").on("click", function (event) {
  // event.preventDefault();
  //capture train name
  var trainName = $('#train-input').val().trim();
  console.log(trainName);
  //capture destination
  var destination = $('#destination-input').val().trim();
  console.log(destination);
  // capture first tain time
  var time = $('#time-input').val().trim();
  console.log(time);
  //caputure frequency
  var frequency = $('#frequency-input').val().trim();
  console.log(frequency);

  // incomplete msg 
//  var incomplete = $('incomplete').val().trim();
//   console.log(incomplete); 
  //validate inputs
  if (trainName !== '' && destination !== '' && time !== '' && frequency !== '') {

    //push to firebase
    database.ref().push({
      trainName: trainName,
      destination: destination,
      time: time,
      frequency: frequency

    });
  }
});

// Firebase watcher + initial loader
database.ref().on("child_added", function (snapshot) {

  var newTrain = snapshot.val().trainName;
  var newDestination = snapshot.val().destination;
  var newTime = snapshot.val().time;
  var newFrequency = snapshot.val().frequency;

  //console log all
  console.log(newTrain);
  console.log(newDestination);
  console.log(newTime);
  console.log(newFrequency);

  var timeArr = newTime.split(":"); // splits user inputed first time 
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]); // this make an actual "moment" out of the time
  var maxMoment = moment.max(moment(), trainTime);
  console.log(maxMoment);
  var tMinutes;
  var tArrival;

  // If the first train is later than the current time, sent arrival to the first train time
 
  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {

    // Calculate the minutes until arrival 
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % newFrequency;
    tMinutes = newFrequency - tRemainder;
    console.log(tMinutes);
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }

  // append new data to table
  var newRow = "<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" +
    newFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>"
  $('.table').append(newRow);


});
