import { useState, useEffect } from "react";
import useVmt from "../../../hooks/Vmt/useVmt";
import { Spin } from "antd";
import useVmtPolban from "../../../hooks/Vmt/useVmtPolban";

const VisiPolban = () => {
	const { loading, vmtPolban, handleUpdateVmtPolban } = useVmtPolban();

	const [visiPolbanInput, setVisiPolbanInput] = useState({
		visi_polban: vmtPolban?.visi_polban || "",
	});

	const handleChangeVisiPolban = (e) => {
		const { name, value } = e.target;
		setVisiPolbanInput((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSaveVisiPolban = async () => {
		await handleUpdateVmtPolban(vmtPolban.id, visiPolbanInput);
	};

	useEffect(() => {
		setVisiPolbanInput({
			visi_polban: vmtPolban?.visi_polban || "",
		});
	}, [vmtPolban]);

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			<div className="space-y-4">
				{loading ? (
					<Spin />
				) : (
					<div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50">
						<input
							type="text"
							name="visi_polban"
							value={visiPolbanInput.visi_polban}
							onChange={handleChangeVisiPolban}
							className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
							placeholder="Masukkan Visi Polban"
						/>
					</div>
				)}
			</div>

			<div className="flex mt-6">
				<button
					onClick={handleSaveVisiPolban}
					className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
					Simpan Visi Polban
				</button>
			</div>
		</div>
	);
};

export default VisiPolban;
