import { useState, useEffect } from "react";
import DeleteButton from "../../Button/DeleteButton";
import { Button, Spin, Form, Input } from "antd";
import useVmtPolban from "../../../hooks/Vmt/useVmtPolban";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import VisibleMenu from "../../Menu/VisibleMenu";

const MisiPolban = () => {
	const {
		vmtPolban,
		handleDeleteMisiPolban,
		handleUpsertMisiPolbans,
		loading,
		errors,
	} = useVmtPolban();

	const [misiPolban, setMisiPolban] = useState([]);

	useEffect(() => {
		if (vmtPolban?.misi_polbans) {
			setMisiPolban(vmtPolban.misi_polbans);
		}
	}, [vmtPolban]);

	const handleAddPoint = () => {
		setMisiPolban([
			...misiPolban,
			{ misi_polban: "", vmt_polban_id: vmtPolban.id },
		]);
	};

	const handleChangePoint = (index, event) => {
		const newMisiPolban = event.target.value;
		setMisiPolban((prevMisiPolban) =>
			prevMisiPolban.map((item, idx) =>
				idx === index ? { ...item, misi_polban: newMisiPolban } : item
			)
		);
	};

	const handleDeletePoint = async (index) => {
		const misi = misiPolban[index];

		if (!misi.id) {
			setMisiPolban((prevMisiPolban) =>
				prevMisiPolban.filter((_, idx) => idx !== index)
			);
		} else {
			await handleDeleteMisiPolban(misi.id);

			setMisiPolban((prevMisiPolban) =>
				prevMisiPolban.filter((_, idx) => idx !== index)
			);
		}
	};

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			{loading ? (
				<Spin />
			) : (
				<div className="space-y-4">
					{misiPolban.map((item, index) => {
						const errorMsg = errors?.[`misi_polbans.${index}.misi_polban`]?.[0];

						return (
							<div
								key={index}
								className="flex items-center space-x-4 p-4 border rounded-lg ">
								<Form.Item
									validateStatus={errorMsg ? "error" : ""}
									help={errorMsg || ""}
									style={{ flex: 1, marginBottom: 0 }}>
									<Input
										type="text"
										value={item.misi_polban}
										onChange={(e) => handleChangePoint(index, e)}
										className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
										placeholder="Masukkan Misi Polban"
									/>
								</Form.Item>
								<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
									<DeleteButton
										className="text-red-500 hover:text-red-700 transition-colors duration-200"
										onDelete={() => handleDeletePoint(index)}>
										Hapus
									</DeleteButton>
								</VisibleMenu>
							</div>
						);
					})}
				</div>
			)}

			<div className="flex gap-2 ">
				<div className="flex justify-center mt-6">
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={handleAddPoint}
							className="h-10 px-6">
							Tambah Point
						</Button>
					</VisibleMenu>
				</div>

				<div className="mt-6 text-center">
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							type="default"
							icon={<SaveOutlined />}
							onClick={() => handleUpsertMisiPolbans(misiPolban)}
							className="h-10 px-6 bg-green-500 text-white hover:bg-green-600">
							Simpan
						</Button>
					</VisibleMenu>
				</div>
			</div>
		</div>
	);
};

export default MisiPolban;
