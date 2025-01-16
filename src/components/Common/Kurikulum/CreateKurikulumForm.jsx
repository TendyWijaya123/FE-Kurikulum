import React from "react";
import { Alert, Select, Input, Button } from "antd"; // Import Ant Design components
import useCreateKurikulum from "../../../hooks/Kurikulum/useCreateKurikulum";

const { Option } = Select;

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
				<Alert
					message={alert.message}
					type={alert.severity} // Severity is used to set the type of alert (success, error, warning, etc.)
					showIcon
					className="mb-4"
				/>
			)}

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="tahun_awal"
						className="block text-sm font-medium text-gray-700">
						Tahun Awal
					</label>
					<Input
						id="tahun_awal"
						type="number"
						name="tahun_awal"
						value={formData.tahun_awal}
						onChange={handleChangeForm}
						className="mt-1 block w-full"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="tahun_akhir"
						className="block text-sm font-medium text-gray-700">
						Tahun Akhir
					</label>
					<Input
						id="tahun_akhir"
						type="number"
						name="tahun_akhir"
						value={formData.tahun_akhir}
						onChange={handleChangeForm}
						className="mt-1 block w-full"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="prodi_id"
						className="block text-sm font-medium text-gray-700">
						Prodi
					</label>
					<Select
						id="prodi_id"
						name="prodi_id"
						value={formData.prodi_id}
						onChange={(value) =>
							handleChangeForm({ target: { name: "prodi_id", value } })
						}
						className="mt-1 block w-full"
						placeholder="Select Prodi"
						required
						showSearch // Enable search functionality
						optionFilterProp="children" // Set the filtering to search based on children (name)
						filterOption={
							(input, option) =>
								option.children.toLowerCase().includes(input.toLowerCase()) // Customize search behavior
						}>
						<Option value="">Select Prodi</Option>
						{prodiList.map((prodi) => (
							<Option key={prodi.id} value={prodi.id}>
								{prodi.name}
							</Option>
						))}
					</Select>
				</div>

				<div className="flex items-center justify-center mt-6">
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={loading}
						disabled={loading}>
						{loading ? "Creating..." : "Create Kurikulum"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateKurikulumForm;
