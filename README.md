# Customer-interaction
## Table of Contents
* Features
* Tech Stack
* Prerequisites
* Installation
* Running the Application
* Endpoints & APIs
* Frontend																					
* Backend																					
* Configuration

### Features
This project is a simple Customer Management system developed as part of an assignment. It features basic CRUD operations and includes JWT authentication. The application is built with a MySQL database and a backend using Spring Boot. The frontend is designed with basic thymeleaf HTML, CSS, and JavaScript.

### Tech Stack
- **Database**: MySQL
- **Backend**: Spring Boot
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: JSON Web Tokens (JWT),Spring security

### Prerequisites
- JDK
- MySQL
- IDE
### Installation 
1. Clone the repository:

    ```bash
    git clone https://github.com/AnshulGayakwad/Customer-interaction.git
    ```

2. Create a MySQL database:
   - You can give any name to the database. Ex:- sunbasedb
    ```sql
    CREATE DATABASE sunbasedb;
    ```



3. Before Running Project update the `application.properties` file from `src/main/resources/` compatible with MySQL database credentials:
    - Replace the credentials of the `password` and `username` with yours.
    
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/sunbasedb
    spring.datasource.username=root
    spring.datasource.password=volkswagen
    ```
### Running the Application
1. Make sure that the Maven is updated
2. Run/start the application
3. Go to the any Browser
4. hit the URL 
```url
http://localhost:8080/
```
5. You should see the Home Page
6. Register yourself and the login, after that you can use the all APIs

### Endpoints & APIs

### Frontend
- **Home Screen**: User login and Register interface.
- **Customer Home Screen**: View, manage and search a list of customers.
- **Add Customer Screen**: Form to add a new customer.
- **Edit Customer Screen**: Form to Edit a new customer.
- **Action Buttons**: Delete and Edit customer button and Logout Button.
- **Sync Button**: Sync the customers from sunbase database.

### Backend
- **Create a Customer**: API to create a new customer.
- **Update a Customer**: API to update existing customer details.
- **Get a List of Customers**: API to retrieve customers with pagination, sorting, and searching.
- **Get a Single Customer by ID**: API to fetch customer details based on their unique ID.
- **Delete a Customer**: API to delete a customer from the database.
- **JWT Authentication**: Secure the API using JWT for authentication.

### Application Screenshots

