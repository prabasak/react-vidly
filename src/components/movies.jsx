import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
	state = {
		movies: getMovies()
	};

	renderMovieList() {
		const { length: moviesCount } = this.state.movies;
		if (moviesCount === 0) return <p>There no movies in the database.</p>;

		return (
			<React.Fragment>
				<p>Showing {moviesCount} movies in the database.</p>
				<div className="table-responsive">
					<table className="table table-striped table-sm">
						<thead>
							<tr>
								<th>Name</th>
								<th>Genre</th>
								<th>Stock</th>
								<th>Rate</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{this.state.movies.map(movie => (
								<tr key={movie._id}>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
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
			</React.Fragment>
		);
	}

	handleDelete = movie => {
		// to show the updated movie list, we have to update the movie list except the movie that is to be deleted
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		// assigning the 'movies' object to the movies state porperty, to update the movie list
		this.setState({ movies: movies }); // Note: This can be rewritten as per ES6 standard "this.setState({movies})"
	};

	render() {
		return <main className="container">{this.renderMovieList()}</main>;
	}
}

export default Movies;
