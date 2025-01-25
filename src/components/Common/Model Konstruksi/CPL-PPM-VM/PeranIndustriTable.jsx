import { useEffect } from "react";
import usePeranIndustri from "../../../../hooks/ModelKonstruksi/usePeranIndustri";
import { Spin } from "antd";

const PeranIndustriTable = () => {
	const {
		peranIndustriList,
		loading,
		error,
		formData,
		editingId,
		setFormData,
		handleInputChange,
		handleDescriptionChange,
		handleAddDescription,
		handleDeleteDescription,
		handleCancel,
		handleEdit,
		handleSubmit,
		removePeranIndustri,
	} = usePeranIndustri();

	return (
		<div className="p-6 bg-white shadow-lg rounded-md">
			<h2 className="text-2xl font-bold mb-4">Peran Industri</h2>

			<form onSubmit={handleSubmit} className="mb-6">
				<div className="flex gap-2 w-full  ">
					<div className="flex-1">
						<label
							htmlFor="jabatan"
							className="block text-sm font-medium text-gray-700">
							Jabatan
						</label>
						<input
							id="jabatan"
							name="jabatan"
							type="text"
							value={formData.jabatan}
							onChange={handleInputChange}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							required
						/>
					</div>

					<div className="flex-1 mb-5">
						<label className="block text-sm font-medium text-gray-700">
							Deskripsi
						</label>
						{formData.descriptions.map((description, index) => (
							<div key={index} className="flex items-center mb-2">
								<input
									type="text"
									name="deskripsi_point"
									value={description.deskripsi_point}
									onChange={(e) => handleDescriptionChange(e, index)}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
									placeholder={`Deskripsi Point ${index + 1}`}
								/>
								{formData.descriptions.length > 1 && (
									<button
										type="button"
										onClick={() => handleDeleteDescription(index)}
										className="ml-2 text-red-500 hover:text-red-700">
										Hapus
									</button>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={handleAddDescription}
							className="mt-2 w-full bg-blue-500 text-white px-4 py-1 rounded-md">
							Tambah Deskripsi
						</button>
					</div>
				</div>

				<div className="flex space-x-2">
					<button
						type="submit"
						className="flex-1 py-2 px-4 text-white font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700">
						{editingId ? "Update Peran Industri" : "Create Peran Industri"}
					</button>
					{editingId && (
						<button
							type="button"
							onClick={handleCancel}
							className="flex-1 py-2 px-4 text-white font-semibold rounded-md bg-gray-500 hover:bg-gray-700">
							Cancel Edit
						</button>
					)}
				</div>
			</form>

			{loading ? (
				<Spin />
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full table-auto border">
						<thead>
							<tr className="bg-blue-100">
								<th className="border px-6 py-3 text-left min-w-[200px]">
									Jabatan
								</th>
								<th className="border px-6 py-3 text-left min-w-[300px]">
									Deskripsi
								</th>
								<th className="border px-6 py-3 text-center min-w-[150px]">
									Aksi
								</th>
							</tr>
						</thead>
						<tbody>
							{peranIndustriList.map((item) => (
								<tr key={item.id}>
									<td className="border px-6 py-2">{item.jabatan}</td>
									<td className="border px-6 py-2">
										{item.peran_industri_deskripsis.length > 0 ? (
											<ol className="list-decimal">
												{item.peran_industri_deskripsis.map((desc) => (
													<li key={desc.id}>{desc.deskripsi_point}</li>
												))}
											</ol>
										) : (
											<div>Tidak ada deskripsi</div>
										)}
									</td>
									<td className="border px-6 py-2 text-center space-x-2">
										<div className="flex space-x-2">
											<button
												onClick={() =>
													handleEdit(
														item.id,
														item.jabatan,
														item.peran_industri_deskripsis
													)
												}
												className="bg-yellow-500 text-white px-4 py-1 rounded-md">
												Edit
											</button>
											<button
												onClick={() => removePeranIndustri(item.id)}
												className="bg-red-500 text-white px-4 py-1 rounded-md">
												Hapus
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default PeranIndustriTable;
