
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
  - **Debug Endpoint**: Returns the full list of purchases stored in the database (http://localhost:8080/debug/purchases).

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



## Additional Information

- The cart items are priced at a fixed rate of 3.99 each.
- The search results include attributes such as title, release date, and genre.
- The checkout process includes form validation for mandatory fields (first name, last name, email).


