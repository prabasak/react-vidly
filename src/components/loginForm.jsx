import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
	state = {
		data: { emailId: "", password: "" },
		errors: {}
	};

	schema = {
		emailId: Joi.string()
			.required()
			.email({ minDomainAtoms: 2 })
			.label("Email field"),
		password: Joi.string()
			.required()
			.label("Password field")
	};

	doSubmit = () => {
		// server call
		console.log("Form submitted");
	}

	render() {
		return (
			<div>
				<form className="form-signin" onSubmit={this.handleSubmit}>
					<div className="text-center mb-4">
						<h1 className="h3 mb-3 font-weight-normal">Login</h1>
					</div>
					{this.renderInput("emailId", "Email Address", "Enter email", "email")}
					{this.renderInput("password", "Password", "Enter password", "password")}
					{this.renderButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
