import { useEffect } from "react";
import { Form, Input, Button, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import VisibleMenu from "../../Menu/VisibleMenu";
import useVmtJurusan from "../../../hooks/Vmt/useVmtJurusan";

const VisiJurusan = () => {
	const { loading, vmtJurusan, handleUpdateVmtJurusan, errors } =
		useVmtJurusan();
	const [form] = Form.useForm();

	// Set nilai awal dari API
	useEffect(() => {
		form.setFieldsValue({
			visi_jurusan: vmtJurusan?.visi_jurusan || "",
			visi_keilmuan_prodi: vmtJurusan?.visi_keilmuan_prodi || "",
		});
	}, [vmtJurusan, form]);

	// Handle submit form
	const handleSaveVisiJurusan = async () => {
		const values = await form.validateFields();
		await handleUpdateVmtJurusan(vmtJurusan.id, values);
	};

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			<h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
				Visi Jurusan & Visi Keilmuan Prodi
			</h2>

			<Form form={form} layout="vertical">
				{/* Input Visi Jurusan */}
				<Form.Item
					label="Visi Jurusan"
					name="visi_jurusan"
					validateStatus={errors?.visi_jurusan ? "error" : ""}
					help={errors?.visi_jurusan?.[0]}>
					<Input placeholder="Masukkan Visi Jurusan" />
				</Form.Item>

				{/* Input Visi Keilmuan Prodi */}
				<Form.Item
					label="Visi Keilmuan Prodi"
					name="visi_keilmuan_prodi"
					validateStatus={errors?.visi_keilmuan_prodi ? "error" : ""}
					help={errors?.visi_keilmuan_prodi?.[0]}>
					<Input placeholder="Masukkan Visi Keilmuan Prodi" />
				</Form.Item>

				{/* Loading Indicator */}
				{loading ? <Spin /> : null}

				{/* Tombol Simpan */}
				<div className="flex mt-6">
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							onClick={handleSaveVisiJurusan}
							className="h-10 px-6 bg-green-500">
							Simpan
						</Button>
					</VisibleMenu>
				</div>
			</Form>
		</div>
	);
};

export default VisiJurusan;
