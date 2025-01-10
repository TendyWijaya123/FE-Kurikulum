import React from "react";
import { Alert } from "@mui/material"; // Import Alert component from MUI
import useCreateKurikulum from "../../../hooks/Kurikulum/useCreateKurikulum";

const CreateKurikulumForm = () => {
	const {
		loading,
		prodiList,
		alert,
		formData,
		handleChangeForm,
		handleSubmit,
	} = useCreateKurikulum();

	return (
		<div className="w-full ml-3 bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold text-start mb-4">
				Create New Kurikulum
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
						htmlFor="tahun_awal"
						className="block text-sm font-medium text-gray-700">
						Tahun Awal
					</label>
					<input
						id="tahun_awal"
						type="number"
						name="tahun_awal"
						value={formData.tahun_awal}
						onChange={handleChangeForm}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="tahun_akhir"
						className="block text-sm font-medium text-gray-700">
						Tahun Akhir
					</label>
					<input
						id="tahun_akhir"
						type="number"
						name="tahun_akhir"
						value={formData.tahun_akhir}
						onChange={handleChangeForm}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
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
						{loading ? "Creating..." : "Create Kurikulum"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateKurikulumForm;
