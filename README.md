
# Movie E-commerce Platform

This project is a modern e-commerce website for browsing, adding to cart, and purchasing movies. It is developed using React for the front end and Spring for the back end. The project utilizes the TMDB API to fetch movie data and stores completed purchases in a SQL Server database.

## Features

### Front End

The front end is developed using React and includes the following features:

- **Search Page**: Allows users to search for movies using various attributes like search string, genre, release date, and popular movies. The search results are fetched from the TMDB API.
  - **Attributes for Search**:
    - **Search String**: Users can search for movies by entering a search string.
    - **Genre**: Users can select a genre from a dropdown list (e.g., Animation, Music, Family).
    - **Release Date**: Users can filter movies by release date or year range.
    - **Popular Movies**: Users can browse popular movies.
    - **Actor Name**: Users can search for movies by actor name.
  - **Search History**: Records every search and builds a history list for quick access. Users can delete individual items or clear the entire history.
- **Cart Page**: Displays the contents of the shopping cart with basic information (image, title, release date, price). Users can remove items individually or empty the cart.
- **Checkout Page**: Allows users to enter their information (first name, last name, email) and complete the purchase. The purchase is saved in the database, and the cart is reset.

### Back End

The back end is developed using Spring and includes the following features:

- **REST API**: Provides endpoints for handling the shopping cart and recording purchases.
  - **Shopping Cart**: Stored in the user session using Spring session beans.
  - **Purchases**: Connects to a SQL Server database to store completed orders.
  

## Project Requirements

- **User-Friendly Design**: The website has a visually appealing and responsive design.
- **Performance Optimization**: The website is optimized for performance, minimizing server requests and data transfer.

## Setup Instructions

### Prerequisites

- Node.js
- npm
- Java
- Spring Boot
- SQL Server

# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.


## Additional Information

- The cart items are priced at a fixed rate of 3.99 each.
- The search results include attributes such as title, release date, and genre.
- The checkout process includes form validation for mandatory fields (first name, last name, email).


