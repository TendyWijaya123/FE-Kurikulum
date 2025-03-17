import { Button, Input, Modal, Select } from "antd";
import { useState } from "react";
import { createMataKuliah } from "../../../service/MataKuliah/MataKuliahService";

const ModalCreateMataKuliah = ({
	isOpen,
	onClose,
	formulasiCpaDropdown,
	metodePembelajaranDropdown,
	bentukPembelajaranDropdown,
	onSave,
}) => {
	const [newData, setNewData] = useState({
		nama: "",
		kode: "",
		kategori: "",
		tujuan: "",
		semester: null,
		teori_bt: 0,
		teori_pt: 0,
		teori_m: 0,
		praktek_bt: 0,
		praktek_pt: 0,
		praktek_m: 0,

		formulasi_cpas: [],
		kemampuan_akhir: [],
		tujuan_belajar: [],
	});

	const handleAddKemampuan = () => {
		const newKemampuanAkhir = [...newData.kemampuan_akhir];
		newKemampuanAkhir.push({
			deskripsi: "",
			estimasi_beban_belajar: "",
			bentuk_pembelajaran: [],
			metode_pembelajaran: [],
		});
		setNewData({
			...newData,
			kemampuan_akhir: newKemampuanAkhir,
		});
	};

	const handleAddTujuanBelajar = () => {
		const newTujuanBelajar = [...newData.tujuan_belajar];
		newTujuanBelajar.push({
			deskripsi: "",
		});
		setNewData({
			...newData,
			tujuan_belajar: newTujuanBelajar,
		});
	};

	const handleRemoveTujuanBelajar = (index) => {
		const newTujuanBelajar = [...newData.tujuan_belajar];
		newTujuanBelajar.splice(index, 1);
		setNewData({
			...newData,
			tujuan_belajar: newTujuanBelajar,
		});
	};

	const handleRemoveKemampuan = (index) => {
		const newKemampuanAkhir = [...newData.kemampuan_akhir];
		newKemampuanAkhir.splice(index, 1);
		setNewData({
			...newData,
			kemampuan_akhir: newKemampuanAkhir,
		});
	};

	return (
		<Modal
			title="Create Mata  Kuliah"
			open={isOpen}
			onCancel={onClose}
			footer={[
				<Button
					key="cancel"
					onClick={() => {
						onClose;
					}}>
					Cancel
				</Button>,
				<Button
					key="save"
					type="primary"
					onClick={() => {
						onSave(newData);
					}}>
					Save
				</Button>,
			]}
			className=" min-w-full p-6 h-screen">
			<div className="space-y-6">
				{" "}
				{/* Memberikan jarak antar elemen dengan space-y-6 */}
				<div>
					<h3 className="text-lg font-semibold">Kode</h3>
					<Input
						type="text"
						onChange={(e) => setNewData({ ...newData, kode: e.target.value })}
						className="w-full mt-2"
					/>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Nama</h3>
					<Input
						type="text"
						onChange={(e) => setNewData({ ...newData, nama: e.target.value })}
						className="w-full mt-2"
					/>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Kategori</h3>
					<Select
						allowClear
						placeholder="Pilih Kategori"
						onChange={(value) => setNewData({ ...newData, kategori: value })}
						options={[
							{ value: "Institusi", label: "Institusi" },
							{ value: "Prodi", label: "Prodi" },
							{ value: "Nasional", label: "Nasional" },
						]}
						className="w-full mt-2"
					/>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Tujuan</h3>
					<Input
						type="textarea"
						onChange={(e) => setNewData({ ...newData, tujuan: e.target.value })}
						className="w-full mt-2"
					/>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Semester</h3>
					<Input
						type="number"
						onChange={(e) =>
							setNewData({ ...newData, semester: e.target.value })
						}
						className="w-full mt-2"
					/>
				</div>
				<div>
					<h2 className="text-lg font-semibold">Teori</h2>
					<div className="flex gap-4 mt-2">
						<Input
							type="number"
							placeholder="BT"
							onChange={(e) =>
								setNewData({ ...newData, teori_bt: e.target.value })
							}
							className="w-full"
						/>
						<Input
							type="number"
							placeholder="PT"
							onChange={(e) =>
								setNewData({ ...newData, teori_pt: e.target.value })
							}
							className="w-full"
						/>

						<Input
							type="number"
							placeholder="M"
							onChange={(e) =>
								setNewData({ ...newData, teori_m: e.target.value })
							}
							className="w-full"
						/>
					</div>
				</div>
				<div>
					<h2 className="text-lg font-semibold">Praktik</h2>
					<div className="flex gap-4 mt-2">
						<Input
							type="number"
							placeholder="BT"
							onChange={(e) =>
								setNewData({ ...newData, praktek_bt: e.target.value })
							}
							className="w-full"
						/>
						<Input
							type="number"
							placeholder="PT"
							onChange={(e) =>
								setNewData({ ...newData, praktek_pt: e.target.value })
							}
							className="w-full"
						/>
						<Input
							type="number"
							placeholder="M"
							onChange={(e) =>
								setNewData({ ...newData, praktek_m: e.target.value })
							}
							className="w-full"
						/>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Formulasi CPA</h3>
					<Select
						mode="multiple"
						onChange={(value) =>
							setNewData({ ...newData, formulasi_cpas: value })
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
						{" "}
						{/* Mengaktifkan scroll horizontal */}
						<table className="w-full min-w-[1000px] table-auto">
							{" "}
							{/* Menambahkan min-width pada tabel */}
							<thead>
								<tr>
									<th className="px-4 py-2 text-left">Deskripsi</th>
									<th className="px-4 py-2 text-left">Estimasi Beban Kerja</th>
									<th className="px-4 py-2 text-left">Bentuk Pembelajaran</th>
									<th className="px-4 py-2 text-left">Metode Pembelajaran</th>
									<th className="px-4 py-2 text-left">Aksi</th>
								</tr>
							</thead>
							<tbody>
								{newData.kemampuan_akhir?.map((kemampuanAkhir, index) => (
									<tr key={index}>
										<td className="px-4 py-2">
											<Input.TextArea
												type="text"
												value={kemampuanAkhir.deskripsi}
												onChange={(e) => {
													const newKemampuanAkhir = [
														...newData.kemampuan_akhir,
													];
													newKemampuanAkhir[index].deskripsi = e.target.value;
													setNewData({
														...newData,
														kemampuan_akhir: newKemampuanAkhir,
													});
												}}
												className="w-full mt-2"
											/>
										</td>
										<td className="px-4 py-2">
											<Input
												type="number"
												value={kemampuanAkhir.estimasi_beban_belajar}
												onChange={(e) => {
													const newKemampuanAkhir = [
														...newData.kemampuan_akhir,
													];
													newKemampuanAkhir[index].estimasi_beban_belajar =
														e.target.value;
													setNewData({
														...newData,
														kemampuan_akhir: newKemampuanAkhir,
													});
												}}
												className="w-full mt-2"
											/>
										</td>
										<td className="px-4 py-2">
											<Select
												mode="multiple"
												value={kemampuanAkhir.bentuk_pembelajaran || []}
												onChange={(value) => {
													const newKemampuanAkhir = [
														...newData.kemampuan_akhir,
													];
													newKemampuanAkhir[index].bentuk_pembelajaran = value;
													setNewData({
														...newData,
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
														...newData.kemampuan_akhir,
													];
													newKemampuanAkhir[index].metode_pembelajaran = value;
													setNewData({
														...newData,
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
								</tr>
							</thead>
							<tbody>
								{newData.tujuan_belajar?.map((tujuanBelajar, index) => (
									<tr key={index}>
										<td px-4 py-2>
											Masukkan tujuan belajar yang baru
										</td>
										<td className="px-4 py-2">
											<Input.TextArea
												type="text"
												value={tujuanBelajar.deskripsi}
												onChange={(e) => {
													const newTujuanBelajar = [...newData.tujuan_belajar];
													newTujuanBelajar[index].deskripsi = e.target.value;
													setNewData({
														...newData,
														tujuan_belajar: newTujuanBelajar,
													});
												}}
												className="w-full mt-2"
											/>
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

export default ModalCreateMataKuliah;
