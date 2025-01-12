import React from "react";
import { Alert } from "@mui/material"; // Import Alert component from MUI
import { JURUSAN_KATEGORI } from "../../../constants/constants"; // Import kategori
import useCreateJurusan from "../../../hooks/Jurusans/useCreateJurusan";

const CreateJurusanForm = () => {
	const { loading, alert, formData, handleChange, handleSubmit } =
		useCreateJurusan();

	return (
		<div className="w-full ml-3 bg-white p-6 rounded-lg shadow-lg mt-6">
			<h2 className="text-2xl font-semibold text-start mb-4">
				Create New Jurusan
			</h2>

			{/* Display Alert if available */}
			{alert && (
				<Alert severity={alert.type} className="mb-4">
					{alert.message}
				</Alert>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
				<div className="mb-4">
					<label
						htmlFor="nama"
						className="block text-sm font-medium text-gray-700">
						Nama Jurusan
					</label>
					<input
						id="nama"
						type="text"
						name="nama"
						value={formData.nama}
						onChange={handleChange}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="kategori"
						className="block text-sm font-medium text-gray-700">
						Kategori
					</label>
					<select
						id="kategori"
						name="kategori"
						value={formData.kategori}
						onChange={handleChange}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required>
						<option value="">Pilih Kategori</option>
						<option value={JURUSAN_KATEGORI.REKAYASA}>
							{JURUSAN_KATEGORI.REKAYASA}
						</option>
						<option value={JURUSAN_KATEGORI.NON_REKAYASA}>
							{JURUSAN_KATEGORI.NON_REKAYASA}
						</option>
					</select>
				</div>

				<div className="flex items-center justify-center mt-6">
					<button
						type="submit"
						className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						disabled={loading}>
						{loading ? "Creating..." : "Create Jurusan"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateJurusanForm;
