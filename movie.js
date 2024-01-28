class Movie {
    constructor(id, title, releaseDate, director, cast, genre, rating, sourceURL, rentalPrice, status) {
      this.id = id;
      this.title = title;
      this.releaseDate = releaseDate;
      this.director = director;
      this.cast = cast;
      this.genre = genre;
      this.rating = rating;
      this.sourceURL = sourceURL;
      this.rentalPrice = rentalPrice;
      this.status = status;
    }
  }
  
  class MovieRentalSystem {
    constructor() {
      this.movieData = [];
      this.cart = [];
    }
  
    addMovie(id, title, releaseDate, director, cast, genre, rating, sourceURL, rentalPrice, status) {
      const movie = new Movie(id, title, releaseDate, director, cast, genre, rating, sourceURL, rentalPrice, status);
      this.movieData.push(movie);
    }
  
    rankMovie(movie) {
      const weights = {
        imdb: 0.4,
        metacritic: 0.3,
        rottenTomatoes: 0.2,
        boxOfficePro: 0.1,
      };
  
      let score = 0;
      for (const source in weights) {
        if (movie[source]) {
          score += movie[source] * weights[source];
        }
      }
  
      return score;
    }
  
    sortAndDisplayTop5() {
      this.movieData.sort((a, b) => this.rankMovie(b) - this.rankMovie(a));
      const top5 = this.movieData.slice(0, 5);
      console.log(top5);
    }
  
    checkMovieStatus(movie) {
      console.log(`The movie, ${movie.title} is available for rent.`);
      return (movie.status = false);
    }
  
    getMovie(id) {
      return this.movieData.find((movie) => movie.id === id);
    }
  
    rentMovie(movieId) {
      const movie = this.movieData.find((movie) => movie.id === movieId);
  
      if (movie.status) {
        this.cart.push(movie);
        movie.status = false;
        console.log(`Successfully rented "${movie.title}"!`);
      } else {
        console.log(`We're sorry, "${movie.title}" is currently unavailable.`);
      }
    }
  
    returnMovie(movieId) {
      const movie = this.movieData.find((movie) => movie.id === movieId);
  
      if (!movie.status) {
        movie.status = true;
        console.log(`Returned "${movie.title}"!`);
      } else {
        console.warn(`"${movie.title}" is already available.`);
      }
    }
  
    addToCart(movieId) {
      const movie = this.movieData.find((movie) => movie.id === movieId);
  
      if (movie.status) {
        if (this.cart.find((item) => item.id === movieId)) {
          console.log(`${movie.title} is already in your cart.`);
        } else {
          this.cart.push(movie);
          console.log(`${movie.title} added to cart!`);
        }
      } else {
        console.log(`We're sorry, "${movie.title}" is currently unavailable.`);
      }
    }
  
    displayCart() {
      console.log(this.cart);
    }
  
    handleCheckout() {
      console.log("Checkout logic goes here.");
    }
  
    handleUserInput() {
      readline.question(
        `Enter a command (rent, return, addToCart, viewCart, checkout, quit): `,
        (command) => {
          switch (command.toLowerCase()) {
            case "rent":
              this.handleRent();
              break;
            case "return":
              this.handleReturn();
              break;
            case "addtocart":
              this.handleAddToCart();
              break;
            case "viewcart":
              this.displayCart();
              break;
            case "checkout":
              this.handleCheckout();
              break;
            case "quit":
              process.exit();
            default:
              console.log("Invalid command. Please try again.");
          }
          this.handleUserInput();
        }
      );
    }
  }
  
  
  const movieRentalSystem = new MovieRentalSystem();
  
  movieRentalSystem.addMovie(
    1,
    "Dune: Part Two",
    "2024-11-17",
    "Denis Villeneuve",
    ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    "Sci-Fi",
    85,
    "https://www.imdb.com/title/tt11803570/",
    4.99,
    true
  );

  
  movieRentalSystem.sortAndDisplayTop5();
  
  movieRentalSystem.displayMovies();
  
  movieRentalSystem.handleUserInput();
  