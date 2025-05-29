// src/constants/tableColumns.js

import { Tag, Form, Input, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Pastikan fungsi-fungsi eksternal seperti handleSave, handleEdit, handleDelete diimpor di tempat penggunaan.

export const mataKuliahColumn = [
	{
		title: "Nama Mata Kuliah",
		key: "nama",
		dataIndex: "nama",
		render: (_, record) => (
			<>
				{record.nama}{" "}
				{record.nama_inggris ? (
					<i>({record.nama_inggris})</i>
				) : (
					<Tag color="error">Nama Inggris belum diisi</Tag>
				)}
			</>
		),
	},
	{
		title: "Kode Mata  Kuliah",
		key: "kode",
		dataIndex: "kode",
	},
	{
		title: "Satuan Kredit Semester",
		key: "sks",
		dataIndex: "sks",
		render: (value) => Number(value),
	},
	{
		title: "Semester",
		key: "semester",
		dataIndex: "semester",
	},
	{
		title: "Tanggal Penyusunan",
		key: "tanggal",
	},
];

export const cplColumn = [
	{
		title: "Kode",
		dataIndex: "kode",
		key: "kode",
	},
	{
		title: "Keterangan",
		dataIndex: "keterangan",
		key: "keterangan",
	},
	{
		title: "Level Of Learning",
		dataIndex: ["pivot", "kategori"],
		key: "keterangan",
	},
];

export const tujuanBelajarColumn = (handleSave) => [
	{
		title: "Kode",
		dataIndex: "kode",
		key: "kode",
	},
	{
		title: "Deskripsi",
		dataIndex: "deskripsi",
		key: "deskripsi",
		render: (_, record) => (
			<Form.Item style={{ marginBottom: 0 }}>
				<Input.TextArea
					value={record.deskripsi}
					onChange={(e) =>
						handleSave({ ...record, deskripsi: e.target.value })
					}
					autoSize={{ minRows: 1, maxRows: 4 }}
					style={{
						border: "none",
						outline: "none",
						boxShadow: "none",
						padding: 0,
						resize: "none",
					}}
				/>
			</Form.Item>
		),
	},
];

export const rpsColumn = (mataKuliahData, handleEdit, handleDelete) => [
	{
		title: "Minggu",
		dataIndex: "minggu",
		key: "minggu",
		width: 80,
	},
	{
		title: "Kemampuan Akhir yang Direncanakan(KAD)",
		dataIndex: "kemampuan_akhir",
		key: "kemampuan_akhir",
		width: 350,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: (_, record) =>
			["ETS", "EAS"].includes(record.kategori) ? null : (
				record.kemampuan_akhir?.deskripsi || <Tag color="error">Belum Diisi</Tag>
			),
	},
	{
		title: "Pokok Bahasan",
		dataIndex: "pokok_bahasan",
		key: "pokok_bahasan",
		width: 300,
		onCell: (record) =>
			["ETS", "EAS"].includes(record.kategori)
				? { colSpan: 9, style: { backgroundColor: "yellow", textAlign: "center" } }
				: {},
		render: (text, record) =>
			["ETS", "EAS"].includes(record.kategori) ? (
				<strong>{record.kategori}</strong>
			) : (
				text
			),
	},
	{
		title: "Modalitas, Bentuk, Strategi, dan Metode Pembelajaran (Media dan Sumber Belajar)",
		dataIndex: "modalitas_bentuk_strategi_metodepembelajaran",
		key: "modalitas_bentuk_strategi_metodepembelajaran",
		width: 350,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: (_, record) =>
			["ETS", "EAS"].includes(record.kategori) ? null : (
				record.modalitas_bentuk_strategi_metodepembelajaran || (
					<Tag color="error">Belum Diisi</Tag>
				)
			),
	},
	{
		title: "Beban Belajar Mahasiswa",
		dataIndex: "",
		key: "beban_belajar",
		width: 250,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: () => (
			<>
				<h1 className="font-bold">Teori</h1>
				<ul>
					<li>BT: {mataKuliahData.teori_bt}</li>
					<li>PT: {mataKuliahData.teori_pt}</li>
					<li>M: {mataKuliahData.teori_m}</li>
				</ul>
				<h1 className="font-bold">Praktek</h1>
				<ul>
					<li>BT: {mataKuliahData.praktek_bt}</li>
					<li>PT: {mataKuliahData.praktek_pt}</li>
					<li>M: {mataKuliahData.praktek_m}</li>
				</ul>
			</>
		),
	},
	{
		title: "Instrumen Penilaian",
		dataIndex: "instrumen_penilaians",
		key: "instrumen_penilaian",
		width: 250,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: (_, record) => {
			const instrumenList = record.instrumen_penilaians;
			if (!instrumenList || instrumenList.length === 0) {
				return <Tag color="error">Belum Diisi</Tag>;
			}
			return instrumenList.map((item, index) => (
				<div key={index} style={{ marginBottom: 8 }}>
					<div style={{ fontWeight: "bold" }}>{item.jenis_evaluasi}</div>
					<div>{item.deskripsi}</div>
				</div>
			));
		},
	},
	{
		title: "Hasil Belajar",
		dataIndex: "hasil_belajar",
		key: "hasil_belajar",
		width: 300,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: (_, record) =>
			record.hasil_belajar || <Tag color="error">Belum Diisi</Tag>,
	},
	{
		title: "Capaian Pembelajaran Lulusan",
		key: "cpl",
		dataIndex: "cpl",
		width: 100,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: (_, record) =>
			record.cpl?.kode || <Tag color="error">Belum Diisi</Tag>,
	},
	{
		title: "Tujuan Belajar",
		key: "tujuan_belajar",
		dataIndex: "tujuan_belajar",
		width: 50,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: (_, record) =>
			record.tujuan_belajar?.kode || <Tag color="error">Belum Diisi</Tag>,
	},
	{
		title: "Bobot Penilaian",
		dataIndex: "bobot_penilaian",
		key: "bobot_penilaian",
		width: 50,
		onCell: (record) => (["ETS", "EAS"].includes(record.kategori) ? { colSpan: 0 } : {}),
		render: (_, record) =>
			record.bobot_penilaian || <Tag color="error">Belum Diisi</Tag>,
	},
	{
		title: "Action",
		key: "action",
		width: 150,
		render: (_, record) => (
			<>
				<Button onClick={() => handleEdit(record)} type="primary">
					<EditOutlined />
				</Button>
				<Popconfirm
					title="Are you sure to delete this RPS?"
					onConfirm={() => handleDelete(record.id)}
				>
					<Button type="primary" danger>
						<DeleteOutlined />
					</Button>
				</Popconfirm>
			</>
		),
	},
];
