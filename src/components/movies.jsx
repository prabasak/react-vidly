import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    // to show the updated movie list, we have to update the movie list except the movie that is to be deleted
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    // assigning the 'movies' object to the movies state porperty, to update the movie list
    this.setState({ movies }); // Note: This can be rewritten as per ES6 standard "this.setState({movies})"
  };

  handleLike = movie => {
    const movies = [...this.state.movies]; // cloning the actual object to avoid data mutation
    const index = movies.indexOf(movie); // fetching index position of each object
    movies[index] = { ...movies[index] }; // cloning each movie object
    movies[index].liked = !movies[index].liked; // toggling the value
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  renderMovieList() {
    const { length: moviesCount } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    if (moviesCount === 0) return <p>There no movies in the database.</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <p>Showing {filtered.length} movies in the database.</p>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">{this.renderMovieList()}</div>
      </div>
    );
  }
}

export default Movies;
