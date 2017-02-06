
"use strict";

$("#userCategory").change(loadCategory);
// Hide sub header on load
$("#subheader").hide();

// Get variable for output div
var output = $("#product-container");

// Global variables
var categoryID;
var typeIDs = [];
var finalProducts = [];


// When user changes categories, it sets off the chain of events
function loadCategory(event){
	var userCategory = parseInt(event.target.value);
	// Show the subheader
	$("#subheader").show();

	// Reset the output <div>'s innerHTML and all global variables
	output.html("");
	categoryID = "";
	typeIDs = [];
	finalProducts = [];

	// Start chain of events
	getCategories(userCategory)
		.then(getTypes)
		.then(getProducts)
		.then(populateDOM);
}



