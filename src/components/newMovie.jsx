import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import Select from "./common/select";

class NewMovie extends Form {
	state = {
		data: { title: "", genre: "", numberInStock: "", rate: "" },
		errors: {}
	};

	schema = {
		title: Joi.string()
			.required()
			.label("Title"),
		genre: Joi.object()
			.keys({ name: Joi.string().required() })
			.label("Genre"),
		numberInStock: Joi.number()
			.required()
			.min(0)
			.label("Number in Stock"),
		rate: Joi.number()
			.required()
			.min(0)
			.label("Rate")
	};

	doSubmit = () => {
		// server call
		console.log("Added new movie");
	};

	render() {
		return (
			<div>
				<form className="form-signin" onSubmit={this.handleSubmit}>
					<div className="text-center mb-4">
						<h1 className="h3 mb-3 font-weight-normal">Add New Movie</h1>
					</div>
					{this.renderInput("title", "Title", "Enter title")}
					{this.renderSelect("Select Genre", getGenres())}
					{this.renderInput(
						"numberInStock",
						"Number in Stock",
						"Enter number in stock"
					)}
					{this.renderInput("rate", "Rate", "Enter rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default NewMovie;
