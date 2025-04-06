import { useState, useEffect } from "react";
import { Button, Spin, Form, Input } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import DeleteButton from "../../Button/DeleteButton";
import VisibleMenu from "../../Menu/VisibleMenu";
import useVmtJurusan from "../../../hooks/Vmt/useVmtJurusan";

const MisiJurusan = () => {
	const {
		vmtJurusan,
		handleDeleteMisiJurusan,
		handleUpsertMisiJurusans,
		loading,
		errors,
	} = useVmtJurusan();

	const [form] = Form.useForm();
	const [misiJurusan, setMisiJurusan] = useState([]);

	useEffect(() => {
		if (vmtJurusan?.misi_jurusans) {
			setMisiJurusan(vmtJurusan.misi_jurusans);
			form.setFieldsValue({ misi_jurusans: vmtJurusan.misi_jurusans });
		}
	}, [vmtJurusan, form]);

	const handleAddPoint = () => {
		setMisiJurusan([
			...misiJurusan,
			{ misi_jurusan: "", vmt_jurusan_id: vmtJurusan.id },
		]);
	};

	const handleChangePoint = (index, event) => {
		const newMisiJurusan = event.target.value;
		setMisiJurusan((prevMisiJurusan) =>
			prevMisiJurusan.map((item, idx) =>
				idx === index ? { ...item, misi_jurusan: newMisiJurusan } : item
			)
		);
	};

	const handleDeletePoint = async (index) => {
		const misi = misiJurusan[index];

		if (!misi.id) {
			setMisiJurusan((prevMisiJurusan) =>
				prevMisiJurusan.filter((_, idx) => idx !== index)
			);
		} else {
			await handleDeleteMisiJurusan(misi.id);

			setMisiJurusan((prevMisiJurusan) =>
				prevMisiJurusan.filter((_, idx) => idx !== index)
			);
			message.success("Misi jurusan berhasil dihapus");
		}
	};

	const handleSave = async () => {
		await form.validateFields();
		await handleUpsertMisiJurusans(misiJurusan);
	};

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg">
			{loading ? (
				<Spin />
			) : (
				<Form form={form} layout="vertical">
					{misiJurusan.map((item, index) => {
						const errorMsg =
							errors?.[`misi_jurusans.${index}.misi_jurusan`]?.[0];

						return (
							<div
								key={index}
								className="flex items-center space-x-4 p-4 rounded-lg shadow-sm">
								<Form.Item
									name={["misi_jurusans", index, "misi_jurusan"]}
									validateStatus={errorMsg ? "error" : ""}
									help={errorMsg}
									className="w-full">
									<Input
										placeholder="Masukkan Misi Jurusan"
										value={item.misi_jurusan}
										onChange={(e) => handleChangePoint(index, e)}
									/>
								</Form.Item>

								<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
									<DeleteButton
										onDelete={() => handleDeletePoint(index)}
										className="text-red-500 hover:text-red-700 transition-colors duration-200">
										Hapus
									</DeleteButton>
								</VisibleMenu>
							</div>
						);
					})}

					<div className="flex gap-2 mt-6">
						<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={handleAddPoint}
								className="h-10 px-6">
								Tambah Point
							</Button>
						</VisibleMenu>

						<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
							<Button
								type="default"
								icon={<SaveOutlined />}
								onClick={handleSave}
								className="h-10 px-6 bg-green-500 text-white hover:bg-green-600">
								Simpan
							</Button>
						</VisibleMenu>
					</div>
				</Form>
			)}
		</div>
	);
};

export default MisiJurusan;
