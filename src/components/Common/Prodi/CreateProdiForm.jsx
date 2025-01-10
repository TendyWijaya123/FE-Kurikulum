import React from "react";
import { Alert } from "@mui/material"; // Import Alert component from MUI
import useCreateProdi from "../../../hooks/Prodi/useCreateProdi"; // Hook untuk CreateProdi
import { JENJANG_ENUM } from "../../../constants/constants";

const CreateProdiForm = () => {
	const {
		loading,
		jurusanList,
		alert,
		formData,
		handleChangeForm,
		handleSubmit,
	} = useCreateProdi();

	return (
		<div className="w-full ml-3 bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold text-start mb-4">
				Create New Prodi
			</h2>

			{/* Display Alert if available */}
			{alert && (
				<Alert severity={alert.severity} className="mb-4">
					{alert.message}
				</Alert>
			)}

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
						htmlFor="jenjang"
						className="block text-sm font-medium text-gray-700">
						Jenjang
					</label>
					<select
						id="jenjang"
						name="jenjang"
						value={formData.jenjang}
						onChange={handleChangeForm}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required>
						<option value="">Select Jenjang</option>
						{JENJANG_ENUM.map((jenjangValue) => (
							<option key={jenjangValue} value={jenjangValue}>
								{jenjangValue}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label
						htmlFor="kode"
						className="block text-sm font-medium text-gray-700">
						Kode
					</label>
					<input
						id="kode"
						type="text"
						name="kode"
						value={formData.kode}
						onChange={handleChangeForm}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="jurusan_id"
						className="block text-sm font-medium text-gray-700">
						Jurusan
					</label>
					<select
						id="jurusan_id"
						name="jurusan_id"
						value={formData.jurusan_id}
						onChange={handleChangeForm}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required>
						<option value="">Select Jurusan</option>
						{jurusanList.map((jurusan) => (
							<option key={jurusan.id} value={jurusan.id}>
								{jurusan.nama}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center justify-center mt-6">
					<button
						type="submit"
						className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						disabled={loading}>
						{loading ? "Creating..." : "Create Prodi"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateProdiForm;
