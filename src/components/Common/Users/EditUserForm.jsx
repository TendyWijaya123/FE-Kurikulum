import React, { useEffect } from "react";
import { Alert } from "@mui/material"; // Import Alert component from MUI
import useEditUser from "../../../hooks/Users/useEditUser";
import { Spin } from "antd";

const EditUserForm = ({ userId }) => {
	const {
		loading,
		prodiList,
		alert,
		formData,
		handleChangeForm,
		handleSubmit,
	} = useEditUser(userId);

	return (
		<div className="w-full ml-3 bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-4xl font-semibold  mb-4">Edit User</h2>

			{/* Display Alert if available */}
			{alert && (
				<Alert severity={alert.severity} className="mb-4">
					{alert.message}
				</Alert>
			)}

			{loading ? (
				<Spin />
			) : (
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							id="name"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChangeForm}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							id="email"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChangeForm}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>

					{/* Password input is optional for editing */}
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700">
							Password (Leave blank to keep current)
						</label>
						<input
							id="password"
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChangeForm}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="prodi_id"
							className="block text-sm font-medium text-gray-700">
							Prodi
						</label>
						<select
							id="prodi_id"
							name="prodi_id"
							value={formData.prodi_id}
							onChange={handleChangeForm}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required>
							<option value="">Select Prodi</option>
							{prodiList.map((prodi) => (
								<option key={prodi.id} value={prodi.id}>
									{prodi.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex items-center justify-center mt-6">
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							disabled={loading}>
							{loading ? "Updating..." : "Update User"}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default EditUserForm;
