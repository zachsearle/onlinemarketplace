
jQuery(document).ready(function(){
	
	
	//intialise product list
	const PRODUCT_LIST = [
		{
		  "key": "brocoli",
		  "name": "Broccoli",
		  "imageURL": "images/broccoli.jpg",
		  "keywords": ["vegetable", "diet", "food", "fresh", "green"],
		  "price": 4,
		  "description": "Lean green health enhancing machine."
		},
		{
		  "name": "Grapes",
		  "key": "grapes",
		  "imageURL": "images/grape.jpg",
		  "keywords": ["food", "fresh", "fruit", "green"],
		  "price": 5,
		  "description": "A grape is a fruit, botanically a berry."
		},
		{
		  "name": "Strawberries",
		  "key": "strawberries",
		  "imageURL": "images/strawberry.jpg",
		  "keywords": ["food", "fresh", "fruit", "breakfast"],
		  "price": 6,
		  "description": "The strawberry is appreciated for its bright red color."
		},
		{
		  "name": "Cheese",
		  "key": "cheese",
		  "imageURL": "images/cheese2.png",
		  "keywords": ["dairy", "breakfast", "food"],
		  "price": 5,
		  "description": "Cheese is nutritious food made mostly from the milk of cows."
		},
		{
		  "name": "Yogurt",
		  "key": "yogurt",
		  "imageURL": "images/yoghurt.png",
		  "keywords": ["dairy", "food", "breakfast"],
		  "price": 3,
		  "description": "Yogurt contains nutrients such as calcium."
		},
		{
		  "name": "Toothpaste",
		  "key": "toothpaste",
		  "imageURL": "images/toothpaste.png",
		  "keywords": ["dental", "hygiene"],
		  "price": 10,
		  "description": "Great for minty-fresh breath."
		},
		{
		  "name": "Shampoo",
		  "key": "shampoo",
		  "imageURL": "images/shampoo.png",
		  "keywords": ["hair", "hygiene"],
		  "price": 15,
		  "description": "Our quality shampoo nurtures your hair terrifically."
		},
		{
		  "name": "Soap",
		  "key": "soap",
		  "imageURL": "images/soap.jpg",
		  "keywords": ["body", "hygiene"],
		  "price": 2,
		  "description": "Natural soap that is rich in nutrients for your skin."
		},
		{
		  "name": "Wine",
		  "key": "wine",
		  "imageURL": "images/wine.png",
		  "keywords": ["alcohol", "bar", "beverage"],
		  "price": 12,
		  "description": "The pride of France in a large bottle."
		},
		{
		  "name": "Napkins",
		  "key": "napkins",
		  "imageURL": "images/napkin.png",
		  "keywords": ["bar", "table"],
		  "price": 4,
		  "description": "Square paper used at a meal to wipe the fingers."
		}
	  ];
	  
	
	//intialise array of reward objects
	const REWARDS = [
		{
		  "name": "Soap Bonus",
		  "key": "soap",
		  "imageURL": "images/soap.jpg",
		  "keywords": ["body", "hygiene"],
		  "price": 0,
		  "description": "Natural soap that is rich in nutrients for your skin."
		},
		{
		  "name": "Cheese Bonus",
		  "key": "cheese",
		  "imageURL": "images/cheese2.png",
		  "keywords": ["dairy", "breakfast", "food"],
		  "price": 0,
		  "description": "Cheese is nutritious food made mostly from the milk of cows."
		},
		{
		  "name": "Wine Bonus",
		  "key": "wine",
		  "imageURL": "images/wine.png",
		  "keywords": ["alcohol", "bar", "beverage"],
		  "price": 0,
		  "description": "The pride of France in a large bottle."
		}
	];
	  
	let sortBy = "default";
	let matches = [];
	let productSection = $("#products");
			
	//run search function on keyup when user is typing
	$("#searchbox").on("keyup", function() {
		search(sortBy);
	});
		  
	//run search also if the user clicks the search button
	$("#search").on("click", function() {
		search(sortBy);
	});
		  
	//when the cart header is pressed, toggle cart
	$("#cartHeader").on("click", function () {
		$("#cart").toggle();
	});
	
	//when sort type is changed, update sortBy variable and run search function
	$("#sort").on("change", function() {
		sortBy = (this.value).toLowerCase();
		search(sortBy);
	});
	
	//intialise cart section and total section variables	  
	let cartSection = $("#cart");
	let SHOPPING_CART = [];
	let totalSection = $("#total");
		  
	//when learn more/show less is pressed, toggle item description  
	$("#products").on("click", ".learn", toggleDescription);
	  
	
	//when a product picture or name is pressed, add item to shopping cart
	$("#products").on("click", ".products", function () {
		SHOPPING_CART.push(matches[parseInt($(this).attr("id"))]); //add the product match to the shopping cart array
		SHOPPING_CART = sortProducts(SHOPPING_CART); //sort the products in the shopping cart array by price
		adjustPurchase(SHOPPING_CART); //run the adjustPurchase function for the new updated shopping cart array
	});
	
	
	
	//when a product from the shopping cart is pressed, remove it from the cart   
	$("#cart").on("click", ".cart", function () {
		SHOPPING_CART.splice(parseInt($(this).attr("id")), 1); //remove item from the cart array
		SHOPPING_CART = sortProducts(SHOPPING_CART); //re-sort products
		adjustPurchase(SHOPPING_CART); //run the adjustPurchase function for the new updated shopping cart array
	});
	 
	 
	  
	/* The display function adds the input array to the desired section as list items.
	Inputs: products - an array of objects that needed to be added
			section - the html section that the products are to be added to
	*/
	  
	function display(products, section) {
		  
		section.empty(); //empty the input section
		let index = 0; 
		let productTitle = 0;
		 
		//cycle through products array
		for (let product of products) {
			//check if the product in the current position is equal to the previous
			//to account for multiple instances in the shopping cart
			if ((index == 0)||(product != products[index-1])) {
				
				//create a product caption by adding the product name and price together
				productTitle = $("<figcaption>")
				.text(product.name + " $" + product.price)
				.attr("class",section.attr("id")) //add a class based on the section input id
				.attr("id", index); //add the current index position as the id
				
				//create a new list item and add the image and product caption to it, add the same class and
				//id as the caption to the image
				let productItem = $("<li>") 
				.append("<img src=" + product.imageURL + " class=" + section.attr("id") + " id=" + index + ">")
				.append(productTitle);
				

				//if the section to add to is the product section, add the product description as a caption.
				//add class = hidden to the paragraph description, add a desc_ + index as an id. Add the learn
				//more text in bold to toggle the description, add index as the id for this text.
				if (section == productSection) {
					let description = $("<figcaption>")
					.append("<p class = hidden id= desc_" + index + ">" + product.description + "</p>")
					.append("<strong class = learn id =" + index + ">Learn more</strong>");
					productItem.append(description); //add the description to the list item
				}
					
				section.append(productItem); //add the list item to the unordered list in the section
			} else {
				//if there is already more than one of the item in the cart, the quantity will be at the start
				//of the string
				numberOfItemsString = productTitle.text().charAt(0);
				let numberOfItems = 1;
				//if the first character is NaN, the current quantity is 1
				if (isNaN(numberOfItemsString)) {
					numberOfItems = 2; //increase the quantity to 2
				} else {
					numberOfItems = parseInt(numberOfItemsString) + 1; //add 1 to the quantity of the first character
				}
				productTitle.text(numberOfItems + " x " + product.name + " $" + product.price); //add quantity to the
																								//product caption
				}
			index++; //increase index value
		}
	}
	
	
	/*The search function finds products that have keywords or names
	that match the users input to the search textbox.
	Inputs: sort - a variable that indicates how the user wants the
			search results to be organised by (default or price).
	*/
	function search(sort) {
		//get the query from the search textbox and make it lower case
		let query = $("#searchbox").val();
		query = query.toLowerCase();
		matches = [];

		//cycle through the products of the product list and check if the
		//search query is included in the product name or its keywords
		//if true, add the product to the matches array
		for (let product of PRODUCT_LIST) {
			let match = false;
			let keywords = product.keywords;
			keywords.push(product.key);
			for (let keyword of keywords) {
				if (keyword.includes(query)) {
					match = true;
				}
			}
			if (match) {
				matches.push(product);
			}
		}
		//if the sort method is default, display the matches in the
		//product section in the order they appear in the product list.
		//Otherwise, if the sort method isn't default, run the sortProducts 
		//function to create a sorted array and display that.
		if (sort == "default") {
			display(matches, productSection);
		
		} else {
			sortedMatches = sortProducts(matches);
			display(sortedMatches, productSection);
		}
		
	}
	
	
	/*The adjustPurchase function updates the shopping cart and the purchase
	total based on the input array.
	Inputs: shoppingCart - an array containing what products are to be displayed
			in the shopping cart and added to the purchase total
	*/
	function adjustPurchase(shoppingCart) {
		
		//create a copy of the shopping cart array values using the slice method
		//to avoid manipulating the shopping cart array
		let cart = shoppingCart.slice(0);
		
		//empty the total section and set the total to 0
		let total = 0;
		totalSection.empty();
		//cycle through the items of the shoppingCart array and
		//add the item price to the purchase total
		for (item of cart) {
			total += item.price;
		}
		
		//if the purchase total is more than 20, add the first reward to the cart
		//if more than 50, add the second reward, if more than 100, add the third
		//reward
		if (total >= 20) {
			cart.push(REWARDS[0]);
		} 
		if (total >= 50)	{
			cart.push(REWARDS[1]);
		}
		if (total >= 100)	{
			cart.push(REWARDS[2]);
		}
		
		//call the display function with the shoppingCart and cart section to
		//display the shopping cart and add the tota to the totalSection
		display(cart, cartSection);
		totalSection.append("$" + total);
	}
	
	
	
	/* The sortProducts function sorts the input array based on the
	individual objects popularity scores (from largest to smallest).
	Inputs: products - the array of products to be sorted.   
	Outputs: products - the sorted array
	*/
	function sortProducts(products) {
	
	//cycle through the products array starting from index 1
		for (let i = 1; i < products.length; i++) {
			//assign a to the product at the current index position
			//and b to the product of the previous position
			let a = products[i];
			let b = products[i-1];
			//use the sort function to sort the products
			products.sort(function (a,b) {
			//if the price of a is less than b, return 1.
			//if the price of b is less than a or the first characters are not equal (to
			//make sure the same product will end up next to each other), return -1.
			//otherwise return 0
  			if (a.price > b.price) {
				return 1;
			} else if ((a.price < b.price)||((a.key).charAt(0) < (b.key).charAt(0))) {
				return -1;
			} 
			return 0;
			})
		}
		return products;
  
	}
	
	
	/*The toggleDescription function displays the product description when the learn more/show less
	text is pressed.
	*/
	function toggleDescription() {
		let title = $(this)
		
		//toggle the product description with the id matching desc_ + the index position indicated by
		//the id of the learn more/show less text
		$("#desc_" + title.attr("id")).toggle(0, function () {
			//if the current text is learn more, change it to show less when the description is toggled
			//otherwise change it back to learn more
			if (title.text() == "Learn more") {
				title.text("Show less");
			} else {
				title.text("Learn more");
			}
		})
	} 
	  
});



