var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db',
});

connection.connect();

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
        		var product = data.product_id;
        		console.log(results[product - 1].product_name);
        	});
});

// [ RowDataPacket {
//     id: 1,
//     product_name: 'leather jacket',
//     department_id: 1,
//     price: 124.95,
//     stock_quantity: 20 },
//   RowDataPacket {
//     id: 2,
//     product_name: 'cargo pants',
//     department_id: 1,
//     price: 34.6,
//     stock_quantity: 25 },
//   RowDataPacket {
//     id: 3,
//     product_name: 'white canvas',
//     department_id: 2,
//     price: 9.99,
//     stock_quantity: 30 },
//   RowDataPacket {
//     id: 4,
//     product_name: 'sketchbook',
//     department_id: 2,
//     price: 12.5,
//     stock_quantity: 15 },
//   RowDataPacket {
//     id: 5,
//     product_name: 'art pencils',
//     department_id: 2,
//     price: 19.9,
//     stock_quantity: 20 },
//   RowDataPacket {
//     id: 6,
//     product_name: 'set of acrylic paint',
//     department_id: 2,
//     price: 25.5,
//     stock_quantity: 30 },
//   RowDataPacket {
//     id: 7,
//     product_name: '"American Gods"',
//     department_id: 3,
//     price: 19.3,
//     stock_quantity: 16 },
//   RowDataPacket {
//     id: 8,
//     product_name: '"Leviathan Wakes"',
//     department_id: 3,
//     price: 14.65,
//     stock_quantity: 10 },
//   RowDataPacket {
//     id: 9,
//     product_name: '"Jennifer Government"',
//     department_id: 3,
//     price: 10.11,
//     stock_quantity: 12 },
//   RowDataPacket {
//     id: 10,
//     product_name: '"Coding in Java"',
//     department_id: 3,
//     price: 22.99,
//     stock_quantity: 10 } ]

// Note to self, maybe have separate connection query in listing of items to pull department name? Or run department query first and then products?