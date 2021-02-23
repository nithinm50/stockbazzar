# stockbazzar
Authentication system to login and search, filter the company name and symbol for the stocks listed in NSE and also view the updated stock details of each company. 

## Setting up mongodb Database

Import the CSV containing the list of companies along with stock exchange Symbol to the query the stock details.

Create a collection named stocks in the database named api and use the command provide beloe to import the stock details.

###### mongoimport --type csv -d api -c stocks --headerline --drop stocks.csv
