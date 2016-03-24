Anthony Ornato (A00915445)
Osanna Hui (A00905454)

Project Completion: 100%

Setup Instructions:
	DB Name: tavola
	SQL file: ./sql_files/tavola.sql

	Admin Login Information:
		Username: aferguson
		Pwd: af123af

Summary of things that went well:
	- Creating admin login and validating login information
	- Creating users related things, they were more straight forward
	- Creating all necessary DB tables and relationships

Summary of things that didn't go as expected:
	- Shopping Cart
		We spent way more time dealing with shopping cart issues that we had expected in the beginning.
		Everything about the shopping cart. 
		Main issue always revoled around sessionStorage (adding, cancelling, updating item quantities and checking out with the updated quantities)

	- Password encryption with md5()
		We had a bit of confusion when trying to encrypt the password, as we were initially under the impression that the encrypted password is different every time it is passed through. But later we found out that it was actually the same, so we saved the encrypted md5 hash into the db and made sure the password variable we were sending in was also encrypted with md5(). Also, we thought that we needed a signup page in order to use md5(), but we got it figured out in the end without using a signup page.

	- Creating Customer
		We couldn't decide what was easiest to do in the beginning, whether it was easier to create a dummy customer from the start or only create a customer if the customer actually checks out. In the end, we went with creating a customer only if that customer checkout. It was less work and less complicated.


Things we will do differently next time:
	- When we encounter something that doesn't work the way it should, look at everything that is connected to that externally as well. Not just what's inside of it.

	