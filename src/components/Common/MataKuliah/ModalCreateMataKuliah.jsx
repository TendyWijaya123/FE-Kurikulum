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
		tujuan: "",
		formulasi_cpas: [],
		kemampuan_akhir: [],
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
				<Button key="cancel" onClick={() => onClose}>
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
			className=" w-full h-screen">
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
					<h3 className="text-lg font-semibold">Tujuan</h3>
					<Input
						type="textarea"
						onChange={(e) => setNewData({ ...newData, tujuan: e.target.value })}
						className="w-full mt-2"
					/>
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
			</div>
		</Modal>
	);
};

export default ModalCreateMataKuliah;
