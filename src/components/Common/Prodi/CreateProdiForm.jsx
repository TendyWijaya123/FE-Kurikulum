import React from "react";
import { Alert, Input, Select, Button } from "antd"; // Import Ant Design components
import { JENJANG_ENUM } from "../../../constants/constants"; // Import Jenjang Enum
import useCreateProdi from "../../../hooks/Prodi/useCreateProdi"; // Hook untuk CreateProdi

const { Option } = Select;

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
				<Alert
					message={alert.message}
					type={alert.severity}
					showIcon
					className="mb-4"
				/>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
				{/* Name Input */}
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<Input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChangeForm}
						className="mt-1 block w-full"
						required
					/>
				</div>

				{/* Jenjang Select */}
				<div className="mb-4">
					<label
						htmlFor="jenjang"
						className="block text-sm font-medium text-gray-700">
						Jenjang
					</label>
					<Select
						id="jenjang"
						name="jenjang"
						value={formData.jenjang}
						onChange={(value) =>
							handleChangeForm({ target: { name: "jenjang", value } })
						}
						className="mt-1 block w-full"
						placeholder="Select Jenjang"
						required
						showSearch>
						<Option value="">Select Jenjang</Option>
						{JENJANG_ENUM.map((jenjangValue) => (
							<Option key={jenjangValue} value={jenjangValue}>
								{jenjangValue}
							</Option>
						))}
					</Select>
				</div>

				{/* Kode Input */}
				<div className="mb-4">
					<label
						htmlFor="kode"
						className="block text-sm font-medium text-gray-700">
						Kode
					</label>
					<Input
						id="kode"
						name="kode"
						value={formData.kode}
						onChange={handleChangeForm}
						className="mt-1 block w-full"
						required
					/>
				</div>

				{/* Jurusan Select with Search */}
				<div className="mb-4">
					<label
						htmlFor="jurusan_id"
						className="block text-sm font-medium text-gray-700">
						Jurusan
					</label>
					<Select
						id="jurusan_id"
						name="jurusan_id"
						value={formData.jurusan_id}
						onChange={(value) =>
							handleChangeForm({ target: { name: "jurusan_id", value } })
						}
						className="mt-1 block w-full"
						placeholder="Select Jurusan"
						showSearch
						required
						filterOption={(input, option) =>
							option?.children.toLowerCase().includes(input.toLowerCase())
						}>
						<Option value="">Select Jurusan</Option>
						{jurusanList.map((jurusan) => (
							<Option key={jurusan.id} value={jurusan.id}>
								{jurusan.nama}
							</Option>
						))}
					</Select>
				</div>

				{/* Submit Button */}
				<div className="flex items-center justify-center mt-6">
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={loading}
						disabled={loading}>
						{loading ? "Creating..." : "Create Prodi"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateProdiForm;
