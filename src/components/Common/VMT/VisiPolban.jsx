import { useState, useEffect } from "react";
import useVmtPolban from "../../../hooks/Vmt/useVmtPolban";
import { Button, Spin, Form, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import VisibleMenu from "../../Menu/VisibleMenu";

const VisiPolban = () => {
	const { loading, vmtPolban, handleUpdateVmtPolban, errors } = useVmtPolban();
	const [form] = Form.useForm();

	// Set initial state dari API
	useEffect(() => {
		form.setFieldsValue({
			visi_polban: vmtPolban?.visi_polban || "",
		});
	}, [vmtPolban, form]);

	const handleSaveVisiPolban = async () => {
		try {
			const values = await form.validateFields();
			await handleUpdateVmtPolban(vmtPolban.id, values);
		} catch (error) {
			console.log("Validasi gagal:", error);
		}
	};

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			<Form form={form} layout="vertical">
				<Form.Item
					name="visi_polban"
					validateStatus={errors?.visi_polban ? "error" : ""}
					help={errors?.visi_polban?.[0]}>
					<Input placeholder="Masukkan Visi Polban" />
				</Form.Item>

				{loading ? <Spin /> : null}

				<div className="flex mt-6">
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							onClick={handleSaveVisiPolban}
							className="h-10 px-6 bg-green-500">
							Simpan
						</Button>
					</VisibleMenu>
				</div>
			</Form>
		</div>
	);
};

export default VisiPolban;
