# Bamazon
A command prompt application using MySQL to keep track of products and sales.

When opened the app will begin by greeting the user and displaying all the items in the database. The items are pulled via MySQL and displayed with an ID number, the item's name, the price, quantity in stock, and a department ID that coorsponds with a different table in the database. 

![App Initialized](/images/ScreenshotOne.png)

The user is then prompted to input the ID of the item they wish to purchase. They are then asked for an amount of the item to purchase. Once that information is received the application will display the total of the sale and prompt the user if they wish to make another purchase. If they say yes, the application will start again with an updated catalog of the items. If no, the application terminates. 

![User being prompted](/images/ScreenshotTwo.png)

This application was built on one javascript file using the MySQL database to store the information. The information was gathered by the application using the node packages "mysql" and "inquirer". 