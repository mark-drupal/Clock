//////////////////////////////////////////////////////////////////////////////
///
///     date.js provides the javascript for the clock.html file and needs to
///     be stored in the same directory as clock.html.  
///
///     It just simply provides the todays date - dd / mm / yyyy
///
//////////////////////////////////////////////////////////////////////////////

///part of ES6 - enable the use strict function
"use strict"
//This is a extention of the code given by the W3C schools tutorial
//The function below will display the current date




//store the id of the elements we want to react with
function today(){
	//create a new date variable
	let date = new Date();
	//store the year
	let year = date.getFullYear();
	//store the month
	let month = date.getMonth();
	//store the date
	let day = date.getDate();
	
	let calendarDate = day + " / " + month + " / " + year
	
	console.log(calendarDate);
	return calendarDate;
}
