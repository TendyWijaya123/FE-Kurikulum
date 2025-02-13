import { useEffect, useState } from "react";
import { Table, Select, Button, message, Modal } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
	assignReferensiKeMataKuliah,
	fetchMataKuliahByJurusan,
} from "../../service/MataKuliah/MataKuliahService";
import { getDropDownBukuReferensiByJurusan } from "../../service/BukuReferensi/BukuReferensiService";

const ReferensiMataKuliah = () => {
	const [mataKuliahs, setMataKuliahs] = useState([]);
	const [dropdownBuku, setDropdownBuku] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedBukuReferensi, setSelectedBukuReferensi] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);

	useEffect(() => {
		loadMataKuliahs();
		loadDropdownBuku();
	}, []);

	const loadMataKuliahs = async () => {
		setLoading(true);
		try {
			const data = await fetchMataKuliahByJurusan();
			setMataKuliahs(data.mata_kuliahs);
		} catch (error) {
			message.error("Gagal mengambil data Mata Kuliah");
		}
		setLoading(false);
	};

	const loadDropdownBuku = async () => {
		setLoading(true);
		try {
			const data = await getDropDownBukuReferensiByJurusan();
			setDropdownBuku(data.buku);
		} catch (error) {
			message.error("Gagal mengambil data Buku Referensi");
		}
		setLoading(false);
	};

	const handleAssignReferensi = async () => {
		if (!selectedMataKuliah) return;
		const selectedValues = selectedBukuReferensi[selectedMataKuliah.id];

		console.log(selectedValues);
		try {
			await assignReferensiKeMataKuliah(
				selectedMataKuliah.id,
				selectedValues && selectedValues.length !== 0 ? selectedValues : []
			);
			message.success("Buku Referensi berhasil ditambahkan");
			loadMataKuliahs();
			setModalVisible(false);
		} catch (error) {
			message.error("Gagal menambahkan Buku Referensi");
		}
	};

	const openModal = (record) => {
		setSelectedMataKuliah(record);
		setModalVisible(true);
		setSelectedBukuReferensi((prev) => ({
			...prev,
			[record.id]: record.buku_referensis.map((buku) => buku.id),
		}));
	};

	const columns = [
		{
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
		},
		{
			title: "Nama Mata Kuliah",
			dataIndex: "nama",
			key: "nama",
		},
		{
			title: "Semester",
			dataIndex: "semester",
			key: "semester",
		},
		{
			title: "Buku Referensi Dipilih",
			key: "bukuReferensiDipilih",
			render: (text, record) => (
				<Select
					mode="multiple"
					className="w-full"
					value={record.buku_referensis.map((buku) => buku.id) || []}
					disabled>
					{dropdownBuku.map((buku) => (
						<Select.Option key={buku.id} value={buku.id}>
							{buku.judul}
						</Select.Option>
					))}
				</Select>
			),
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (text, record) => (
				<Button type="primary" onClick={() => openModal(record)}>
					Kelola Referensi
				</Button>
			),
		},
	];

	return (
		<DefaultLayout>
			<div className="p-6 bg-white shadow-lg rounded-lg">
				<h1 className="text-xl font-bold mb-4">
					Manajemen Referensi Mata Kuliah
				</h1>
				<Table
					dataSource={mataKuliahs}
					columns={columns}
					rowKey="id"
					loading={loading}
					bordered
				/>
			</div>

			<Modal
				title="Kelola Buku Referensi"
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				onOk={handleAssignReferensi}>
				{selectedMataKuliah && (
					<div>
						<p className="font-bold mb-2">{selectedMataKuliah.nama}</p>
						<Select
							mode="multiple"
							placeholder="Pilih Buku Referensi"
							className="w-full"
							value={selectedBukuReferensi[selectedMataKuliah.id] || []}
							onChange={(values) =>
								setSelectedBukuReferensi((prev) => ({
									...prev,
									[selectedMataKuliah.id]: values,
								}))
							}>
							{dropdownBuku.map((buku) => (
								<Select.Option key={buku.id} value={buku.id}>
									{buku.judul}
								</Select.Option>
							))}
						</Select>
					</div>
				)}
			</Modal>
		</DefaultLayout>
	);
};

export default ReferensiMataKuliah;
