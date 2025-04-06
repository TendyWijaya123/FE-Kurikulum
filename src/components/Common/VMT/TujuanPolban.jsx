import { useState, useEffect } from "react";
import DeleteButton from "../../Button/DeleteButton";
import { Button, Spin, Form, Input, message } from "antd";
import useVmtPolban from "../../../hooks/Vmt/useVmtPolban";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import VisibleMenu from "../../Menu/VisibleMenu";

const TujuanPolban = () => {
	const {
		vmtPolban,
		handleDeleteTujuanPolban,
		handleUpsertTujuanPolbans,
		loading,
		errors,
	} = useVmtPolban();

	const [tujuanPolban, setTujuanPolban] = useState([]);

	useEffect(() => {
		if (vmtPolban?.tujuan_polbans) {
			setTujuanPolban(vmtPolban.tujuan_polbans);
		}
	}, [vmtPolban]);

	const handleAddPoint = () => {
		setTujuanPolban([
			...tujuanPolban,
			{ tujuan_polban: "", vmt_polban_id: vmtPolban.id },
		]);
	};

	const handleChangePoint = (index, event) => {
		const newTujuanPolban = event.target.value;
		setTujuanPolban((prevTujuanPolban) =>
			prevTujuanPolban.map((item, idx) =>
				idx === index ? { ...item, tujuan_polban: newTujuanPolban } : item
			)
		);
	};

	const handleDeletePoint = async (index) => {
		const tujuan = tujuanPolban[index];

		if (!tujuan.id) {
			setTujuanPolban((prevTujuanPolban) =>
				prevTujuanPolban.filter((_, idx) => idx !== index)
			);
		} else {
			await handleDeleteTujuanPolban(tujuan.id);
			setTujuanPolban((prevTujuanPolban) =>
				prevTujuanPolban.filter((_, idx) => idx !== index)
			);
			message.success("Tujuan polban berhasil dihapus");
		}
	};

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			{loading ? (
				<Spin />
			) : (
				<Form layout="vertical">
					<div className="space-y-4">
						{tujuanPolban.map((item, index) => {
							const errorMsg =
								errors?.[`tujuan_polbans.${index}.tujuan_polban`]?.[0];

							return (
								<div
									key={index}
									className="flex items-center space-x-4 p-4 border rounded-lg">
									<Form.Item
										className="flex-1"
										validateStatus={errorMsg ? "error" : ""}
										help={errorMsg || ""}>
										<Input
											value={item.tujuan_polban}
											onChange={(e) => handleChangePoint(index, e)}
											placeholder="Masukkan Tujuan Polban"
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
					</div>
				</Form>
			)}

			<div className="flex gap-4 mt-6">
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
						onClick={() => handleUpsertTujuanPolbans(tujuanPolban)}
						className="h-10 px-6 bg-green-500 text-white hover:bg-green-600">
						Simpan
					</Button>
				</VisibleMenu>
			</div>
		</div>
	);
};

export default TujuanPolban;
