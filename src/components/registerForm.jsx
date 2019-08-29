import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
	state = {
		data: { emailId: "", password: "", name: "" },
		errors: {}
	};

	schema = {
		emailId: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
			.label("Email field"),
		password: Joi.string()
			.required()
			.min(5)
			.label("Password field"),
		name: Joi.string()
			.required()
			.label("Name field")
	};

	doSubmit = () => {
		// server call
		console.log("Registration form submitted");
	};

	render() {
		return (
			<div>
				<form className="form-signin" onSubmit={this.handleSubmit}>
					<div className="text-center mb-4">
						<h1 className="h3 mb-3 font-weight-normal">Registration</h1>
					</div>
					{this.renderInput("emailId", "Email Address", "Enter email", "email")}
					{this.renderInput(
						"password",
						"Password",
						"Enter password",
						"password"
					)}
					{this.renderInput("name", "Name", "Enter name")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
