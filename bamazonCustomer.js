var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db',
});

connection.connect();

var runApp = function(){
	connection.query('SELECT * from products', function (error, results, fields)
	{
		console.log("Welcome to Bamazon! Here is our selection of products for today:")
	    for (var i = 0; i<results.length; i++){
	    	console.log("Item ID: " + results[i].id);
	    	console.log("Item Name: " + results[i].product_name);
	    	console.log("Price: $" + results[i].price);
	    	console.log("Quantity in Stock: " + results[i].stock_quantity);
	    	console.log("Department ID: " + results[i].department_id);
	    	console.log('=============================\n');
	    };
	    	inquirer.prompt([
	    		{type: "input",
	      		name: "product_id",
	      		message: "Please enter the Item ID of the product you wish to purchase."}
	    		]).then(function(data){
	        		var product = data.product_id - 1;
	        		console.log("You have selected " + results[product].product_name);
	        		
	        		inquirer.prompt([
	    				{type: "input",
	      				name: "units",
	      				message: "How much of this item would you like to purchase?"}
	    				]).then(function(data){
	    					var units = data.units
	    					var totalCost = units * results[product].price;
	    					var newCount = results[product].stock_quantity - units;
	    					if (newCount >= 0){
	    						console.log("Your selection of " + units + " " + results[product].product_name + " will have a total cost of $" + totalCost + ".");
	    						connection.query("UPDATE products SET stock_quantity=" + newCount + " WHERE id=" + results[product].id, function(err, res) { 
	            					if (err) return console.log(err);
	         					});
	         					connection.query("INSERT INTO sales (product_id, quantity_purchased) VALUES (" + results[product].id + ", " + units + " )", function(err, res) { 
	            					if (err) return console.log(err);
	          					});
	          					inquirer.prompt([
	    							{type: "input",
	      							name: "confirm",
	      							message: "Thank you for your purchase, would you like to make another one? yes/no"}
	    							]).then(function(data){
	    								if (data.confirm == "yes"){
	    									runApp();
	    								} else {
	    									console.log("Have a nice day!")
	    									connection.end();
	    								}
	    						});
	    					} else {
	    						inquirer.prompt([
	    							{type: "input",
	      							name: "confirm",
	      							message: "Insufficient quantity in stock! Would you like to try again? yes/no"}
	    							]).then(function(data){
	    								if (data.confirm == "yes"){
	    									runApp();
	    								} else {
	    									console.log("Have a nice day!")
	    									connection.end();
	    								}
	    						});
	    					};
	    			});
	        });
	});
};

runApp();