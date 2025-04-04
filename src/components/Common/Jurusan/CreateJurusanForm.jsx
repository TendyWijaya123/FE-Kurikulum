import React from "react";
import { Alert, Input, Select, Button, Form } from "antd"; // Import Ant Design components
import { JURUSAN_KATEGORI } from "../../../constants/constants"; // Import kategori
import useCreateJurusan from "../../../hooks/Jurusans/useCreateJurusan";

const { Option } = Select;

const CreateJurusanForm = () => {
	const { loading, errors, formData, handleChange, handleSubmit } =
		useCreateJurusan();

	return (
		<div className="w-full ml-3 bg-white p-6 rounded-lg shadow-lg mt-6">
			<h2 className="text-2xl font-semibold text-start mb-4">
				Create New Jurusan
			</h2>

			<Form
				layout="vertical"
				onFinish={handleSubmit}
				initialValues={formData}
				onValuesChange={(changedValues) =>
					handleChange({
						target: {
							name: Object.keys(changedValues)[0],
							value: Object.values(changedValues)[0],
						},
					})
				}>
				<Form.Item
					label="Nama Jurusan"
					name="nama"
					validateStatus={errors?.nama ? "error" : ""}
					help={errors?.nama || ""}
					required>
					<Input
						id="nama"
						name="nama"
						value={formData.nama}
						onChange={handleChange}
					/>
				</Form.Item>

				<Form.Item
					label="Kategori"
					name="kategori"
					validateStatus={errors?.kategori ? "error" : ""}
					help={errors?.kategori || ""}
					required>
					<Select
						id="kategori"
						name="kategori"
						value={formData.kategori}
						onChange={(value) =>
							handleChange({ target: { name: "kategori", value } })
						}
						className="mt-1 block w-full"
						placeholder="Pilih Kategori">
						<Option value="">Pilih Kategori</Option>
						<Option value={JURUSAN_KATEGORI.REKAYASA}>
							{JURUSAN_KATEGORI.REKAYASA}
						</Option>
						<Option value={JURUSAN_KATEGORI.NON_REKAYASA}>
							{JURUSAN_KATEGORI.NON_REKAYASA}
						</Option>
					</Select>
				</Form.Item>

				<div className="flex items-center justify-center mt-6">
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={loading}
						disabled={loading}>
						{loading ? "Creating..." : "Create Jurusan"}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default CreateJurusanForm;
