import { Button, Modal, Input, Select, Form } from "antd";
import { useEffect, useState } from "react";

const ModalEditMataKuliah = ({
	isOpen,
	onClose,
	editData,
	formulasiCpaDropdown,
	metodePembelajaranDropdown,
	bentukPembelajaranDropdown,
	handleUpdate,
	errors,
}) => {
	const [editedData, setEditedData] = useState(editData);
	useEffect(() => {
		setEditedData(editData);
	}, [editData]);

	const handleRemoveKemampuan = (index) => {
		const newKemampuanAkhir = [...editedData.kemampuan_akhir];
		newKemampuanAkhir.splice(index, 1);
		setEditedData({
			...editedData,
			kemampuan_akhir: newKemampuanAkhir,
		});
	};

	const handleRemoveTujuanBelajar = (index) => {
		const newTujuanBelajar = [...editedData.tujuan_belajar];
		newTujuanBelajar.splice(index, 1);
		setEditedData({
			...editedData,
			tujuan_belajar: newTujuanBelajar,
		});
	};

	const handleAddKemampuan = () => {
		const newKemampuanAkhir = [...editedData.kemampuan_akhir];
		newKemampuanAkhir.push({
			deskripsi: "",
			estimasi_beban_belajar: "",
			bentuk_pembelajaran: [],
			metode_pembelajaran: [],
		});
		setEditedData({
			...editedData,
			kemampuan_akhir: newKemampuanAkhir,
		});
	};

	const handleAddTujuanBelajar = () => {
		const newTujuanBelajar = [...editedData.tujuan_belajar];
		newTujuanBelajar.push({
			deskripsi: "",
		});
		setEditedData({
			...editedData,
			tujuan_belajar: newTujuanBelajar,
		});
	};

	const handleCloseModal = () => {
		onClose();
		setEditedData({});
	};

	return (
		<Modal
			title="Edit Mata Kuliah"
			open={isOpen}
			onCancel={onClose}
			footer={[
				<Button key="cancel" onClick={onClose}>
					Cancel
				</Button>,
				<Button
					key="save"
					type="primary"
					onClick={() => handleUpdate(editedData)}>
					Save
				</Button>,
			]}
			className=" min-w-full p-6 h-screen">
			<div className="space-y-6">
				{" "}
				{/* Memberikan jarak antar elemen dengan space-y-6 */}
				<div>
					<h3 className="text-lg font-semibold">Kode</h3>
					<Form.Item
						validateStatus={errors?.kode ? "error" : ""}
						help={errors?.kode || ""}>
						<Input
							type="text"
							value={editedData.kode}
							onChange={(e) =>
								setEditedData({ ...editedData, kode: e.target.value })
							}
							className="w-full mt-2"
						/>
					</Form.Item>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Nama</h3>
					<Form.Item
						validateStatus={errors?.nama ? "error" : ""}
						help={errors?.nama || ""}>
						<Input
							type="text"
							value={editedData.nama}
							onChange={(e) =>
								setEditedData({ ...editedData, nama: e.target.value })
							}
							className="w-full mt-2"
						/>
					</Form.Item>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Kategori</h3>
					<Form.Item
						validateStatus={errors?.kategori ? "error" : ""}
						help={errors?.kategori || ""}>
						<Select
							value={editedData.kategori}
							onChange={(value) =>
								setEditedData({ ...editedData, kategori: value })
							}
							options={[
								{ value: "Institusi", label: "Institusi" },
								{ value: "Prodi", label: "Prodi" },
								{ value: "Nasional", label: "Nasional" },
							]}
							className="w-full mt-2"
						/>
					</Form.Item>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Tujuan</h3>
					<Form.Item
						validateStatus={errors?.tujuan ? "error" : ""}
						help={errors?.tujuan || ""}>
						<Input
							type="textarea"
							value={editedData.tujuan}
							onChange={(e) =>
								setEditedData({ ...editedData, tujuan: e.target.value })
							}
							className="w-full mt-2"
						/>
					</Form.Item>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Semester</h3>
					<Form.Item
						validateStatus={errors?.semester ? "error" : ""}
						help={errors?.semester || ""}>
						<Input
							type="number"
							value={editedData.semester}
							onChange={(e) =>
								setEditedData({ ...editedData, semester: e.target.value })
							}
							className="w-full mt-2"
						/>
					</Form.Item>
				</div>
				<div>
					<h2 className="text-lg font-semibold">Teori</h2>
					<div className="flex gap-4 mt-2">
						<Form.Item
							validateStatus={errors?.teori_bt ? "error" : ""}
							help={errors?.teori_bt || ""}>
							<Input
								type="number"
								placeholder="BT"
								value={editedData.teori_bt}
								onChange={(e) =>
									setEditedData({ ...editedData, teori_bt: e.target.value })
								}
								className="w-full"
							/>
						</Form.Item>

						<Form.Item
							validateStatus={errors?.teori_pt ? "error" : ""}
							help={errors?.teori_pt || ""}>
							<Input
								type="number"
								placeholder="PT"
								value={editedData.teori_pt}
								onChange={(e) =>
									setEditedData({ ...editedData, teori_pt: e.target.value })
								}
								className="w-full"
							/>
						</Form.Item>

						<Form.Item
							validateStatus={errors?.teori_m ? "error" : ""}
							help={errors?.teori_m || ""}>
							<Input
								type="number"
								placeholder="M"
								value={editedData.teori_m}
								onChange={(e) =>
									setEditedData({ ...editedData, teori_m: e.target.value })
								}
								className="w-full"
							/>
						</Form.Item>
					</div>
				</div>
				<div>
					<h2 className="text-lg font-semibold">Praktik</h2>
					<div className="flex gap-4 mt-2">
						<Form.Item
							validateStatus={errors?.praktek_bt ? "error" : ""}
							help={errors?.praktek_bt || ""}>
							<Input
								type="number"
								placeholder="BT"
								value={editedData.praktek_bt}
								onChange={(e) =>
									setEditedData({ ...editedData, praktek_bt: e.target.value })
								}
								className="w-full"
							/>
						</Form.Item>

						<Form.Item
							validateStatus={errors?.praktek_pt ? "error" : ""}
							help={errors?.praktek_pt || ""}>
							<Input
								type="number"
								placeholder="PT"
								value={editedData.praktek_pt}
								onChange={(e) =>
									setEditedData({ ...editedData, praktek_pt: e.target.value })
								}
								className="w-full"
							/>
						</Form.Item>
						<Form.Item
							validateStatus={errors?.praktek_m ? "error" : ""}
							help={errors?.praktek_m || ""}>
							<Input
								type="number"
								placeholder="M"
								value={editedData.praktek_m}
								onChange={(e) =>
									setEditedData({ ...editedData, praktek_m: e.target.value })
								}
								className="w-full"
							/>
						</Form.Item>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Formulasi CPA</h3>
					<Select
						mode="multiple"
						value={editedData.formulasi_cpas}
						onChange={(value) =>
							setEditedData({ ...editedData, formulasi_cpas: value })
						}
						options={formulasiCpaDropdown.map((item) => ({
							value: item.id,
							label: item.kode,
						}))}
						className="w-full mt-2"
					/>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Kemampuan Akhir</h3>
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1000px] table-auto">
							<thead>
								<tr>
									<th className="px-4 py-2 text-left w-[40%]">Deskripsi</th>
									<th className="px-4 py-2 text-left w-[20%]">
										Estimasi Beban Kerja
									</th>
									<th className="px-4 py-2 text-left w-[20%]">
										Bentuk Pembelajaran
									</th>
									<th className="px-4 py-2 text-left w-[15%]">
										Metode Pembelajaran
									</th>
									<th className="px-4 py-2 text-left w-[5%]">Aksi</th>
								</tr>
							</thead>
							<tbody>
								{editedData.kemampuan_akhir?.map((kemampuanAkhir, index) => (
									<tr key={index}>
										<td className="px-4 py-2">
											{" "}
											<Form.Item
												validateStatus={
													errors?.[`kemampuan_akhirs.${index}.deskripsi`]?.[0]
														? "error"
														: ""
												}
												help={
													errors?.[
														`kemampuan_akhirs.${index}.deskripsi`
													]?.[0] || ""
												}>
												<Input.TextArea
													type="text"
													value={kemampuanAkhir.deskripsi}
													onChange={(e) => {
														const newKemampuanAkhir = [
															...editedData.kemampuan_akhir,
														];
														newKemampuanAkhir[index].deskripsi = e.target.value;
														setEditedData({
															...editedData,
															kemampuan_akhir: newKemampuanAkhir,
														});
													}}
													className="w-full mt-2"
												/>
											</Form.Item>
										</td>
										<td className="px-4 py-2">
											<Form.Item
												validateStatus={
													errors?.[
														`kemampuan_akhirs.${index}.estimasi_beban_belajar`
													]?.[0]
														? "error"
														: ""
												}
												help={
													errors?.[
														`kemampuan_akhirs.${index}.estimasi_beban_belajar`
													]?.[0] || ""
												}>
												<Input
													type="number"
													value={kemampuanAkhir.estimasi_beban_belajar}
													onChange={(e) => {
														const newKemampuanAkhir = [
															...editedData.kemampuan_akhir,
														];
														newKemampuanAkhir[index].estimasi_beban_belajar =
															e.target.value;
														setEditedData({
															...editedData,
															kemampuan_akhir: newKemampuanAkhir,
														});
													}}
													className="w-full mt-2"
												/>
											</Form.Item>
										</td>
										<td className="px-4 py-2">
											<Select
												mode="multiple"
												value={kemampuanAkhir.bentuk_pembelajaran || []}
												onChange={(value) => {
													const newKemampuanAkhir = [
														...editedData.kemampuan_akhir,
													];
													newKemampuanAkhir[index].bentuk_pembelajaran = value;
													setEditedData({
														...editedData,
														kemampuan_akhir: newKemampuanAkhir,
													});
												}}
												options={bentukPembelajaranDropdown.map((item) => ({
													value: item.id,
													label: item.nama,
												}))}
												className="w-full mt-2"
											/>
										</td>
										<td className="px-4 py-2">
											<Select
												mode="multiple"
												value={kemampuanAkhir.metode_pembelajaran || []}
												onChange={(value) => {
													const newKemampuanAkhir = [
														...editedData.kemampuan_akhir,
													];
													newKemampuanAkhir[index].metode_pembelajaran = value;
													setEditedData({
														...editedData,
														kemampuan_akhir: newKemampuanAkhir,
													});
												}}
												options={metodePembelajaranDropdown.map((item) => ({
													value: item.id,
													label: item.nama,
												}))}
												className="w-full mt-2"
											/>
										</td>
										<td className="px-4 py-2">
											<button
												onClick={() => handleRemoveKemampuan(index)}
												className="text-red-500 hover:text-red-700">
												Hapus
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<button
						onClick={handleAddKemampuan}
						className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
						Tambah Kemampuan
					</button>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Tujuan Belajar</h3>
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1000px] table-auto">
							<thead>
								<tr>
									<th className="px-4 py-2 text-left">Kode</th>
									<th className="px-4 py-2 text-left">Deskripsi</th>
									<th className="px-4 py-2 text-left">Aksi</th>
								</tr>
							</thead>
							<tbody>
								{editedData.tujuan_belajar?.map((tujuanBelajar, index) => (
									<tr key={index}>
										<td>
											{tujuanBelajar.kode
												? tujuanBelajar.kode
												: "Masukkan Tujuan Belajar yang baru"}
										</td>
										<td className="px-4 py-2">
											<Form.Item
												validateStatus={
													errors?.[`tujuan_belajar.${index}.deskripsi`]?.[0]
														? "error"
														: ""
												}
												help={
													errors?.[`tujuan_belajar.${index}.deskripsi`]?.[0] ||
													""
												}>
												<Input.TextArea
													type="text"
													value={tujuanBelajar.deskripsi}
													onChange={(e) => {
														const newTujuanBelajar = [
															...editedData.tujuan_belajar,
														];
														newTujuanBelajar[index].deskripsi = e.target.value;
														setEditedData({
															...editedData,
															tujuanBelajar: newTujuanBelajar,
														});
													}}
													className="w-full mt-2"
												/>
											</Form.Item>
										</td>

										<td className="px-4 py-2">
											<button
												onClick={() => handleRemoveTujuanBelajar(index)}
												className="text-red-500 hover:text-red-700">
												Hapus
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<button
						onClick={handleAddTujuanBelajar}
						className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
						Tambah Tujuan Belajar
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ModalEditMataKuliah;
