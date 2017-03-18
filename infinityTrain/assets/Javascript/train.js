
$(document).ready(function() {
	 
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyADL6TvF17KitJpVgOlc3CSbKritnIcSSA",
    authDomain: "traintime-a9440.firebaseapp.com",
    databaseURL: "https://traintime-a9440.firebaseio.com",
    storageBucket: "traintime-a9440.appspot.com",
    messagingSenderId: "1036840353273"
  };
  firebase.initializeApp(config);

var database = firebase.database();
	var trainName = "";
	var destination = "";
	var trainTime = 0;
	var frequency = 0;
	var trainTimeConverted = 0;
	var currentTime = 0;
	var diffTime = 0;
	var remainder = 0;
	var minutesAway = 0;
	var nextTrain = 0;

$('#addTrainBtn').on('click', function() {
	trainName = $('#trainNameInput').val().trim();
	destination = $('#destinationInput').val().trim();
	trainTime = $('#trainTimeInput').val().trim();
	frequency = $('#frequencyInput').val().trim();

database.ref().push({
	trainName: trainName,
	destination: destination,
	trainTime: trainTime,
	frequency: frequency
	})
	return false;
})
database.ref().on('child_added', function(snapshot){
	trainName = snapshot.val().trainName
	destination = snapshot.val().destination
	trainTime = snapshot.val().trainTime
	frequency = snapshot.val().frequency
	currentTime = moment();
	trainTimeConverted = moment(trainTime,"hh:mm a").subtract(1, "years");

// Between train times
diffTime = currentTime.diff(trainTimeConverted, "minutes");

// remainder time
remainder = diffTime % frequency;

// Minute for the train 
minutesAway = frequency - remainder;

// The next one
nextTrain = moment().add(minutesAway, "minutes")
nextTrain = nextTrain.format('hh:mm a')
$('tbody').append(
"<tr><td>"+trainName+
"</td><td>"+destination+
"</td><td>"+frequency+
"</td><td>"+nextTrain+
"</td><td>"+minutesAway+"</td></tr>");

	})
})