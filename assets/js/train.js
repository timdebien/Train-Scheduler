
var config = {
    apiKey: "AIzaSyCE55R0IOt8NaggNHjdmHPtAO37L-1I2aQ",
    authDomain: "train-schedule-2815c.firebaseapp.com",
    databaseURL: "https://train-schedule-2815c.firebaseio.com",
    projectId: "train-schedule-2815c",
    storageBucket: "train-schedule-2815c.appspot.com",
    messagingSenderId: "216058169006"
  };
  firebase.initializeApp(config);
  
  var database = fibase.databae();
  

// Capture Button Click
$("#add-space-train").on("click", function(){

//capture train name
var trainName = $('#train-input').val().trim();
console.log(trainName);
//capture destination
var destination = $('destination-input').val().trim();
console.log(destination);
// capture first tain time
var time = $('time-input').val().trim();
console.log(time);
//caputure frequency
var frequency = $('frequency-input').val().trim();
console.log(frequency);

//push to firebase
database.ref().push({
  trainName: trainName,
  destination: destination,
  time: time,
  frequency: frequency
  
  
   
   
 
});
 // Firebase watcher + initial loader
database.ref().on("child_added", function(snapshot){
  
  var newTrain = snapshot.val().trainName;
  var newDestination = snapshot.val().destination;
  var newTime = snapshot.val().time;
  var newFrequency = snapshot.val().frequency
 
  //console log all
  console.log(snap)
  console.log(snapshot.val().destination);
  console.log(snapshot.val().time);
  console.log(snapshot.val().frequency);




});
