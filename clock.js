//////////////////////////////////////////////////////////////////////////////
///
///     clock.js provides the javascript fort he clock.html file and needs to
///     be stored in the same directory as clock.html.
///
///     It provides all the functionality for the clock face.  The is based on
///     the javascript canvas clock tutorial on the w3schools:
///
///		https://www.w3schools.com/graphics/canvas_clock.asp
///
///
//////////////////////////////////////////////////////////////////////////////

///part of ES6 - enable the use strict function
"use strict"


///first we need a link from to the <canvas> element in clock.html
const canvas = document.getElementById("analog_canvas");

//next we need to create an object to draw width
const ctx = canvas.getContext("2d");

//this is a fairly crude radius calculaton - this is the middle of the canvas essentially.
let radius = canvas.height/2;
console.log("Canvas height: " + canvas.height);
console.log("Width: " + canvas.width);

//position the drawing object - in the case we want the middle of the canvas
ctx.translate(radius, radius);

//ensure the radius is 90% of the canvas
radius = radius * 0.90;

//call the drawClock() in order to actually draw the face of the drawClock
//this is done at interval otherwise it only works once
// in this case its called every second.

setInterval(drawClock, 1000);

function drawClock(){

  //define the size of the circle we want to drawing
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);

  //define the fillstyle for the circle
  ctx.fillStyle = "White";

  //draw the circle
  ctx.fill();
  
  ///call the drawFace function so we can draw the face onto the clock
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);

}


///pass the CTX and the Radius as defined above
function drawFace(ctx, radius){
	
	//begin drawring or in this case - reset it
	ctx.beginPath();
		
	//define the arc to draw
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	
	//define the fill style
	ctx.fillStyle = "white";
	
	//actually draw the circle
	ctx.fill();
	
	
	
	///we now draw another circle just inside of the actual clock circle
	
	///in order to make things look a bit better we are going to use some gradient colors
	///a variable to store the gradient
	let grad;
	///define a gradient
	grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
	//we now add 3 colour stops to use:
	//first one
	grad.addColorStop(0, "#333");
	//middle
	grad.addColorStop(0.5, "white");
	//final one
	grad.addColorStop(1, "#333");
	///seen as we have defined a color gradient we want to use it, so add it to the brush
	ctx.strokeStyle = grad;
	///next we define the width of the drawing object - in this case 10% of the radius
	ctx.lineWidth= radius * 0.1;
	//finally we want to draw the circle
	ctx.stroke();
	
	
	///here we defined the clock center - to which the hands will come from
	///reset the drawing object
	ctx.beginPath();
	///define the cicle that is being drawn
	ctx.arc(0, 0, radius * 0.1, 0, 2*Math.PI);
	///define the colour to fill it in with
	ctx.fillStyle = "#333";
	//actually draw the circle
	ctx.fill();
	
}

//this is a fucntion to draw the numbers on the clock face
//like the clockface helper function we have to pass ctx and radius
function drawNumbers(ctx, radius){
	
	//to begin with we need a font size - in this case its 15% of the radius
	ctx.font = radius * 0.15 + "px arial";
	
	//next we set the font alignment in the case in the middle
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
		
	//next we need to calculate and draw each number
	
	let ang;
	let num;
	///has to be less than 13 as there are only 12 numbers on a clock face
	for (num = 1; num < 13; num ++){
		
		//work out the angle
		ang = num * Math.PI / 6;
		//move the drawing object to the new position
		ctx.rotate(ang);
		//work out where to draw the number
		ctx.translate(0, -radius * 0.85);
		//rotate again this time minus the angle - so that the number is straight
		ctx.rotate(-ang);
		//write the number
		ctx.fillText(num.toString(), 0, 0);
		//rotate again to the angle
		ctx.rotate(ang);
		//move the drawing object again 
		ctx.translate(0, radius * 0.85);
		//rotate the drawing object so the number will be straight
		ctx.rotate(-ang);
		
	}	
}	

function drawTime(ctx, pos, length, width){
	
	//first of all we need to get the current time
	let now = new Date();
	//put into seperate variables - hours, mins, seconds
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	
	//this code works our the hour hand
	//next we need to calculate the angle of the hands
	hour = hour % 12;
	//work out what to draw
	hour = (hour *Math.PI/6) + (minute * Math.PI / (6*60)) + (second *Math.PI/(360 *60));
	//call the drawHand function to draw the actual hand
	drawHand(ctx, hour, radius*0.8, radius *0.07);
	
	//this code works out the minute hand
	minute = (minute * Math.PI / 30) + (second * Math.PI/(30*60));
	//call the drawHand function to draw the min hand
	drawHand(ctx, minute, radius*0.8, radius * 0.07);
	
	//this code works out the second hand
	second = (second * Math.PI / 30);
	//call the draw hand function to draw the second hand
	drawHand(ctx, second, radius*0.9, radius * 0.02);
	
}

function drawHand(ctx, pos, length, width){
	
	//reset the drawing object
	ctx.beginPath();
	//define a line width
	ctx.lineWidth = width;
	//deine how the end of the line should look
	ctx.lineCap = "round";
	//define the position to being at - the center of the clock (canvanas)
	ctx.moveTo(0,0);
	//rotote to the right position (angle to draw the line at)
	ctx.rotate(pos);
	//define where to start and where to finish the line length
	ctx.lineTo(0,length);
	//draw the line
	ctx.stroke();
	//reset the drawing object to a normal position 
	ctx.rotate(-pos);

}
