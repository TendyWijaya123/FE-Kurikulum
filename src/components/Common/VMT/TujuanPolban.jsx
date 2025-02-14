import { useState, useEffect } from "react";
import DeleteButton from "../../Button/DeleteButton";
import { Button, Spin } from "antd";
import useVmtPolban from "../../../hooks/Vmt/useVmtPolban";
import { PlusOutlined } from "@ant-design/icons";
import { SaveOutlined } from "@mui/icons-material";

const TujuanPolban = () => {
	const {
		vmtPolban,
		handleDeleteTujuanPolban,
		handleUpsertTujuanPolbans,
		loading,
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
		}
	};

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			{loading ? (
				<Spin />
			) : (
				<div className="space-y-4">
					{tujuanPolban.map((item, index) => (
						<div
							key={index}
							className="flex items-center space-x-4 p-4 border rounded-lg ">
							<input
								type="text"
								value={item.tujuan_polban}
								onChange={(e) => handleChangePoint(index, e)}
								className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								placeholder="Masukkan Tujuan Polban"
							/>
							<DeleteButton
								onDelete={() => handleDeletePoint(index)}
								className="text-red-500 hover:text-red-700 transition-colors duration-200">
								Hapus
							</DeleteButton>
						</div>
					))}
				</div>
			)}

			<div className="flex gap-2 ">
				<div className="flex gap-4 justify-center mt-6">
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleAddPoint}
						className="h-10 px-6">
						Tambah Point
					</Button>

					<Button
						type="default"
						icon={<SaveOutlined />}
						onClick={() => handleUpsertTujuanPolbans(tujuanPolban)}
						className="h-10 px-6 bg-green-500 text-white hover:bg-green-600">
						Simpan
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TujuanPolban;
