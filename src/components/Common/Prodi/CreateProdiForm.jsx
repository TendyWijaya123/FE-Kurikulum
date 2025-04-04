import React from "react";
import { Alert, Input, Select, Button, Form } from "antd"; // Import Ant Design components
import { JENJANG_ENUM } from "../../../constants/constants"; // Import Jenjang Enum
import useCreateProdi from "../../../hooks/Prodi/useCreateProdi"; // Hook untuk CreateProdi

const { Option } = Select;

const CreateProdiForm = () => {
	const {
		loading,
		jurusanList,
		alert,
		formData,
		errors,
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

			<Form
				layout="vertical"
				onFinish={handleSubmit}
				initialValues={formData}
				onValuesChange={(changedValues) =>
					handleChangeForm({
						target: {
							name: Object.keys(changedValues)[0],
							value: Object.values(changedValues)[0],
						},
					})
				}>
				{/* Name Input */}
				<Form.Item
					label="Name"
					name="name"
					validateStatus={errors?.name ? "error" : ""}
					help={errors?.name || ""}
					required>
					<Input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChangeForm}
					/>
				</Form.Item>

				{/* Jenjang Select */}
				<Form.Item
					label="Jenjang"
					name="jenjang"
					validateStatus={errors?.jenjang ? "error" : ""}
					help={errors?.jenjang || ""}
					required>
					<Select
						id="jenjang"
						name="jenjang"
						value={formData.jenjang}
						onChange={(value) =>
							handleChangeForm({ target: { name: "jenjang", value } })
						}
						className="mt-1 block w-full"
						placeholder="Select Jenjang"
						showSearch>
						<Option value="">Select Jenjang</Option>
						{JENJANG_ENUM.map((jenjangValue) => (
							<Option key={jenjangValue} value={jenjangValue}>
								{jenjangValue}
							</Option>
						))}
					</Select>
				</Form.Item>

				{/* Kode Input */}
				<Form.Item
					label="Kode"
					name="kode"
					validateStatus={errors?.kode ? "error" : ""}
					help={errors?.kode || ""}
					required>
					<Input
						id="kode"
						name="kode"
						value={formData.kode}
						onChange={handleChangeForm}
					/>
				</Form.Item>

				{/* Jurusan Select with Search */}
				<Form.Item
					label="Jurusan"
					name="jurusan_id"
					validateStatus={errors?.jurusan_id ? "error" : ""}
					help={errors?.jurusan_id || ""}
					required>
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
				</Form.Item>

				{/* Submit Button */}
				<Form.Item>
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
				</Form.Item>
			</Form>
		</div>
	);
};

export default CreateProdiForm;
