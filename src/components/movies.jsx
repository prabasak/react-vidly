import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/fakeGenreService";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: "title", order: "asc" }
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	getPagedData() {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			movies: allMovies
		} = this.state;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	}

	renderMovieList() {
		const { length: moviesCount } = this.state.movies;
		const { pageSize, currentPage, sortColumn } = this.state;

		if (moviesCount === 0) return <p>There no movies in the database.</p>;

		const { totalCount, data: movies } = this.getPagedData();

		return (
			<React.Fragment>
				<Link className="btn btn-sm btn-primary" to="/movies/new">
					<i class="fa fa-plus" aria-hidden="true"></i> Add Movies
				</Link>
				<p>Showing {totalCount} movies in the database.</p>
				<MoviesTable
					movies={movies}
					onDelete={this.handleDelete}
					onLike={this.handleLike}
					onSort={this.handleSort}
					sortColumn={sortColumn}
				/>
				<Pagination
					itemsCount={totalCount}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}

	render() {
		return (
			<section className="content">
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
			</section>
		);
	}
}

export default Movies;
