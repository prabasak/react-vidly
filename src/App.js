import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import NavBar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewMovie from './components/newMovie';

import "./App.css";

function App() {
	return (
		<main role="main">
			<NavBar />
			<section className="container">
				<Switch>
					<Route path="/login" component={LoginForm}></Route>
					<Route path="/register" component={RegisterForm}></Route>
					<Route path="/movies/new" component={NewMovie} />
					<Route path="/movies/:id" component={MovieForm} />
					<Route path="/movies" component={Movies} />
					<Route path="/customers" component={Customers} />
					<Route path="/rentals" component={Rentals} />
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/movies" />
					<Redirect to="/not-found" />
				</Switch>
			</section>
		</main>
	);
}

export default App;
