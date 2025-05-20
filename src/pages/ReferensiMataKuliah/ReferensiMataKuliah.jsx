import { useEffect, useState } from "react";
import { Table, Select, Button, message, Modal, Input } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
	assignReferensiKeMataKuliah,
	fetchMataKuliahByJurusan,
} from "../../service/MataKuliah/MataKuliahService";
import { getDropDownBukuReferensiByJurusan } from "../../service/BukuReferensi/BukuReferensiService";
import { BookOutlined, SearchOutlined } from "@ant-design/icons";
import { getProdiDropdownByJurusanDosen } from "../../service/api";

const ReferensiMataKuliah = () => {
	const [mataKuliahs, setMataKuliahs] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [dropdownBuku, setDropdownBuku] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedBukuReferensi, setSelectedBukuReferensi] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
	const [filters, setFilters] = useState({
		nama: "",
		kode: "",
		prodi_id: undefined,
	});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	useEffect(() => {
		loadMataKuliahs(1);
		loadDropdownBuku();
	}, []);

	useEffect(() => {
		loadProdiDropdown();
	}, []);

	const loadProdiDropdown = async () => {
		try {
			const data = await getProdiDropdownByJurusanDosen();
			setProdiDropdown(data);
		} catch (error) {}
	};

	const loadMataKuliahs = async (page = 1) => {
		setLoading(true);
		try {
			const response = await fetchMataKuliahByJurusan({
				...filters,
				page,
			});
			console.log(response.data);
			setMataKuliahs(response.data);
			setPagination((prev) => ({
				...prev,
				current: page,
				total: response.total,
			}));
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

	const handleSearch = () => {
		loadMataKuliahs(1);
	};

	const handleTableChange = (pagination) => {
		loadMataKuliahs(pagination.current);
	};

	const handleAssignReferensi = async () => {
		if (!selectedMataKuliah) return;
		const selectedValues = selectedBukuReferensi[selectedMataKuliah.id];

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
			title: "Prodi",
			dataIndex: ["kurikulum", "prodi", "name"],
			key: "prodi",
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
					<BookOutlined />
				</Button>
			),
		},
	];

	return (
		<DefaultLayout title={"Manajemen Referensi Mata Kuliah"}>
			<div className="p-6 bg-white shadow-lg rounded-lg">
				<h1 className="text-xl font-bold mb-4">
					Manajemen Referensi Mata Kuliah
				</h1>

				{/* Filter */}
				<div className="mb-4 flex gap-4">
					<Input
						placeholder="Cari Kode Mata Kuliah"
						value={filters.kode}
						onChange={(e) =>
							setFilters((prev) => ({ ...prev, kode: e.target.value }))
						}
					/>
					<Input
						placeholder="Cari Nama Mata Kuliah"
						value={filters.nama}
						onChange={(e) =>
							setFilters((prev) => ({ ...prev, nama: e.target.value }))
						}
					/>
					<Select
						placeholder="Pilih Prodi"
						allowClear
						style={{ width: 200, marginRight: 8 }}
						value={filters.prodi_id}
						onChange={(value) =>
							setFilters((prev) => ({ ...prev, prodi_id: value }))
						}>
						{prodiDropdown.map((prodi) => (
							<Select.Option key={prodi.id} value={prodi.id}>
								{prodi.name}
							</Select.Option>
						))}
					</Select>
					<Button type="primary" onClick={handleSearch}>
						<SearchOutlined />
					</Button>
				</div>

				{/* Tabel */}
				<Table
					className="overflow-x-auto"
					dataSource={mataKuliahs}
					columns={columns}
					rowKey="id"
					loading={loading}
					bordered
					pagination={{
						current: pagination.current,
						pageSize: pagination.pageSize,
						total: pagination.total,
						showSizeChanger: false,
					}}
					onChange={handleTableChange}
				/>
			</div>

			<Modal
				title="Kelola Buku Referensi"
				open={modalVisible}
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
