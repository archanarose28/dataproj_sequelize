# DATA PROJECT

## Data project using sequelize and setting up connection to mysql.


<details open>
<summary> Table of Contents </summary>

+ 1. About The Project
+ 2. Built With
+ 3. Getting Started
    + Prerequisites
+ 4. Usage
+ 5. Problems in detail
</details>

1. ### **About The Project**

    The project is to read a CSV file, do some aggregation/filtering/grouping functions and print out the results in JSON file format using sequelize and  source data is the company registration data for any state, from data.gov.in, the Government of India's open data platform.

2. ### **Built With**
 * Node js<br>
Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.
 * Sequlize<br>
Sequelize is a promise-based Node.js ORM for Postgres, MySQL etc.



3. ### **Getting Started**

   #### **Prerequisites**
 * Visual studio Code-
    

4. ### **Usage**
   The project is usable in situations when we need to filter or retrieve data from a csv file using node js and convert into json file and download those generated JSON file to the local system.

5. ### Problems in Detail- Do using sequelize queries

*  **Count by Authorized Cap**<br>
Calculate the number of companies whose "Authorized Cap" falls in the following intervals ...
<= 1L,
1L to 10L,
10L to 1Cr,
1Cr to 10Cr,> 10Cr
* **Company Registration by Year (From 2000 to 2019)**<br>
From the column DATE_OF_REGISTRAION parse out the registration year. Using this piece of data, calculate the number of company registrations per year. Print out the result of your calculation in table format using ConsoleTables.

* **Company Registration by principal business activity (for the year 2015)** <br>
In this problem filter only the records for the year 2015. Then   count the number of company registration by "PRINCIPAL_BUSINESS_ACTIVITY" and print them out in table format, similar to the previous tables.

* **Grouped aggregation**<br>
For this problem, count the number of companies, grouped on both the year and "Principal Business Activity". Also, restrict the years to 2000-2019.




