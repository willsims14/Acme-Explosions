"use strict";

// Loads the categories
let getCategories = function(userChoice){
	return new Promise((resolve, reject) =>{
		var catRequest = new XMLHttpRequest();
		catRequest.addEventListener("load", function(){
			let categories = Object.values(JSON.parse(event.target.responseText))[0];
			for(var i = 0; i < categories.length; i++){
				if(userChoice === categories[i].id){
					categoryID = categories[i].id;
				}
			}
			// Sends back the Category object that was chosen
			resolve();
		});

		catRequest.addEventListener("error", function(){
			console.log("ERROR");
			reject("Categories failed to load.")
		});

		catRequest.open("GET", "javascripts/categories.json");
		catRequest.send();
	})
};

// Load the types
let getTypes = function(){
	return new Promise((resolve, reject) =>{
		var typeRequest = new XMLHttpRequest();

		typeRequest.addEventListener("load", function(){
			let types = Object.values(JSON.parse(event.target.responseText))[0];

			for(var i = 0; i < types.length; i++){
				if(types[i].category === categoryID){
					typeIDs.push(types[i].id);
				}
			}
			resolve();
		});

		typeRequest.addEventListener("error", function(){
			console.log("ERROR");
			reject("Types failed to load.");
		});

		typeRequest.open("GET", "javascripts/types.json");
		typeRequest.send();

	})
}

// Load the products
let getProducts = function(){
	return new Promise((resolve, reject) => {
		var prodRequest = new XMLHttpRequest();
		prodRequest.addEventListener("load", function(){
			let products = Object.values(JSON.parse(event.target.responseText))[0];
			for(var i = 0; i < products.length; i++){
				for(var j = 0; j < typeIDs.length; j++){
					if(products[i].type === typeIDs[j]){
						finalProducts.push(products[i]);
					}
				}
			}
			resolve();
		});

		prodRequest.addEventListener("error", function(){
			console.log("ERROR");
			reject("Products failed to load.");
		});

		prodRequest.open("GET", "javascripts/products.json");
		prodRequest.send();

	})
};

function populateDOM(){
	for(var i = 0; i < finalProducts.length; i++){
		var newProduct = document.createElement("DIV");
		newProduct.className = "row";

		newProduct.innerHTML = 	`<span class="col-sm-3">${finalProducts[i].name}</span>
								 <span class="col-sm-3">ID: ${finalProducts[i].id}</span>
								 <span class="col-sm-3">Type: ${finalProducts[i].type}</span>
								 <span class="col-sm-3">${finalProducts[i].description}</span>
								`;
		output.append(newProduct);
		output.append("<hr>");
	}
}