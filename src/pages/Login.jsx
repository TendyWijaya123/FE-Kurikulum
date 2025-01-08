import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useLoginForm } from "../hooks/useLoginForm";

const Login = () => {
	const {
		email,
		password,
		handleChangeEmail,
		handleChangePassword,
		handleSubmit,
	} = useLoginForm();

	return (
		<div className="flex justify-center items-center bg-blue-950 w-full h-screen">
			<div className="w-96 bg-white rounded-sm p-6 flex-col justify-center shadow-lg">
				<h1 className="text-3xl font-semibold text-center text-blue-950 mb-6">
					Login
				</h1>

				{/* Form Login */}
				<form onSubmit={handleSubmit}>
					{/* Form Input Email */}
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => handleChangeEmail(e)}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your email"
							required
						/>
					</div>

					{/* Form Input Password */}
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => handleChangePassword(e)}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your password"
							required
						/>
					</div>

					{/* Login Button */}
					<button
						type="submit"
						className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
