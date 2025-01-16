import React from "react";
import { Alert, Input, Select, Button } from "antd"; // Import Ant Design components
import { JURUSAN_KATEGORI } from "../../../constants/constants"; // Import kategori
import useCreateJurusan from "../../../hooks/Jurusans/useCreateJurusan";

const { Option } = Select;

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
				<Alert
					message={alert.message}
					type={alert.type}
					showIcon
					className="mb-4"
				/>
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
					<Input
						id="nama"
						name="nama"
						value={formData.nama}
						onChange={handleChange}
						className="mt-1 block w-full"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="kategori"
						className="block text-sm font-medium text-gray-700">
						Kategori
					</label>
					<Select
						id="kategori"
						name="kategori"
						value={formData.kategori}
						onChange={(value) =>
							handleChange({ target: { name: "kategori", value } })
						}
						className="mt-1 block w-full"
						placeholder="Pilih Kategori"
						required>
						<Option value="">Pilih Kategori</Option>
						<Option value={JURUSAN_KATEGORI.REKAYASA}>
							{JURUSAN_KATEGORI.REKAYASA}
						</Option>
						<Option value={JURUSAN_KATEGORI.NON_REKAYASA}>
							{JURUSAN_KATEGORI.NON_REKAYASA}
						</Option>
					</Select>
				</div>

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
			</form>
		</div>
	);
};

export default CreateJurusanForm;
