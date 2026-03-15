# SQL Injection Login Demo

## Overview

This project demonstrates a simple login system vulnerable to SQL Injection. It is built using Node.js, Express, and MySQL to show how insecure query construction can allow attackers to bypass authentication.

The goal of this project is educational:
* To understand how SQL Injection works
* To demonstrate the risks of insecure database queries
* To highlight the importance of secure coding practices

This project is not intended for production use.

***

## What is SQL?

Structured Query Language (SQL) is a standard language used to interact with relational databases. It allows applications to:
* Store data
* Retrieve data
* Update records
* Delete records

Example SQL query:
>SELECT * FROM user_info WHERE username='admin';  

SQL is widely used in relational database systems such as MySQL, PostgreSQL, and SQLite.

***

## What is SQL Injection?

SQL Injection is a web security vulnerability that allows attackers to manipulate database queries by injecting malicious SQL code into input fields.

This usually happens when user input is directly concatenated into SQL queries without validation or parameterization.

Example vulnerable query:
>SELECT * FROM user_info WHERE username='USER_INPUT' AND password='USER_INPUT';

An attacker could enter:
>' OR 1=1 --

Which modifies the query to:
>SELECT * FROM user_info WHERE username='' OR 1=1 --' AND password=''

Because 1=1 is always true, the login check may be bypassed.

***
## Project Description

This project implements a simple login form connected to a MySQL database.

The backend constructs SQL queries using string concatenation, intentionally leaving the application vulnerable to SQL Injection.

The purpose is to demonstrate how attackers can exploit poorly written database queries.

***
## Technologies Used
* Node.js
* Express.js
* MySQL
* HTML/CSS
* dotenv (for environment variables)

***
## Payloads

Below are some of the SQLi payloads you can use :
* ' OR 1=1 #
* ' OR 1=1;#
* ' OR 1=1 -- 
* ' OR '1'='1' -- 
* admin' -- 
* ' OR TRUE -- 
* ' OR 1=1#
* ' OR user='admin' -- 
* ' OR 'a'='a' -- 

You are not restricted to these... go ahead and try a variety of other payloads..!

***
## How To Run The Project
1.	Clone the repository
    >git clone https://github.com/0xmohith/Web-Security-Labs.git

2.	Navigate into the project directory
    >cd SQLi_login

3. Install dependencies
   >npm install  
   npm install -g nodemon

4. Create a .env file using .env.example
   >DB_HOST=localhost  
    DB_USER=root  
    DB_PASSWORD=yourpassword  
    DB_NAME=yourdatabase

5. Run the project with nodemon
   >npm run dev   
   nodemon server.js

6. Navigate to the browser
   >http://localhost:3000

*** 
## Recommended Secure Practice

Instead of constructing SQL queries using string concatenation, applications should use parameterized queries or prepared statements.

Example secure query:
>db.query("SELECT * FROM user_info WHERE username=? AND password=?", [username, password])

This prevents attackers from modifying the structure of SQL queries.

***
## Disclaimer

This project is created for educational and cybersecurity learning purposes only.
Do not use this code in production environments.

### Author
Mohith Krishna K