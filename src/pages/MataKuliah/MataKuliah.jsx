import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
	createMataKuliah,
	fetchBentukPembelajaranDropdown,
	fetchFormulasiCpaDropdown,
	fetchMataKuliah,
	fetchMetodePembelajaranDropdown,
	updateMataKuliah,
} from "../../service/MataKuliah/MataKuliahService";
import { Select, Button, Input, Modal, Spin, Table } from "antd"; // Import Spin from Ant Design
import ModalCreateMataKuliah from "../../components/Common/MataKuliah/ModalCreateMataKuliah";
import ModalEditMataKuliah from "../../components/Common/MataKuliah/ModalEditMataKuliah";
import useMataKuliah from "../../hooks/MataKuliah/useMataKuliah";
import DeleteButton from "../../components/Button/DeleteButton";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const MataKuliah = () => {
	const {
		mataKuliahData,
		formulasiCpaDropdown,
		metodePembelajaranDropdown,
		bentukPembelajaranDropdown,
		loading,
		editedData,
		isModalCreateVisible,
		isModalUpdateVisible,
		handleModalCreateClose,
		handleModalUpdateClose,
		handleOnEdit,
		handleCreateSave,
		handleUpdate,
		handleDelete,
		setIsModalCreateVisible,
	} = useMataKuliah();

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
			title: "Beban Belajar(Menit/Minggu)",
			children: [
				{
					title: "Teori",
					children: [
						{
							title: "BT",
							dataIndex: "teori_bt",
							key: "teori_bt",
						},
						{
							title: "PT",
							dataIndex: "teori_pt",
							key: "teori_pt",
						},
						{
							title: "M",
							dataIndex: "teori_m",
							key: "teori_m",
						},
					],
				},
				{
					title: "Praktek",
					children: [
						{
							title: "BT",
							dataIndex: "praktek_bt",
							key: "praktek_bt",
						},
						{
							title: "PT",
							dataIndex: "praktek_pt",
							key: "praktek_pt",
						},
						{
							title: "M",
							dataIndex: "praktek_m",
							key: "praktek_m",
						},
					],
				},
			],
		},
		{
			title: "Formulasi C, P, A",
			key: "formulasi cpa",
			render: (_, record, index) => (
				<div className="flex gap-2">
					<Select
						mode="multiple"
						value={record.formulasi_cpas || []}
						options={formulasiCpaDropdown.map((item) => ({
							value: item.id,
							label: item.kode,
						}))}
						style={{ width: "100%" }}
						disabled
					/>
				</div>
			),
		},
		{
			title: "SKS",
			dataIndex: "sks",
			key: "sks",
		},
		{
			title: "Total Beban Belajar",
			render: (_, record, index) => {
				return record.sks * 45;
			},
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, record, index) => (
				<div className="flex gap-2">
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={() => handleOnEdit(index)}
					/>
					<Button
						type="primary"
						danger
						icon={<DeleteOutline />}
						onClick={() => handleDelete(record.id)}
					/>
				</div>
			),
			width: 100,
		},
	];

	const kemampuanAkhirColumns = [
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
		},
		{
			title: "Estimasi Beban Belajar",
			dataIndex: "estimasi_beban_belajar",
			key: "estimasi_beban_belajar",
		},
		{
			title: "Bentuk Pembelajaran",
			key: "bentuk_pembelajaran",
			render: (_, record, index) => (
				<div className="flex gap-2">
					<Select
						mode="multiple"
						value={record.bentuk_pembelajaran || []}
						options={bentukPembelajaranDropdown.map((item) => ({
							value: item.id,
							label: item.nama,
						}))}
						style={{ width: "100%" }}
						disabled
					/>
				</div>
			),
		},
		{
			title: "Metode Pembelajaran",
			key: "metode_pembelajaran",
			render: (_, record, index) => (
				<div className="flex gap-2">
					<Select
						mode="multiple"
						value={record.metode_pembelajaran || []}
						options={metodePembelajaranDropdown.map((item) => ({
							value: item.id,
							label: item.nama,
						}))}
						style={{ width: "100%" }}
						disabled
					/>
				</div>
			),
		},
	];
	return (
		<DefaultLayout title="Mata Kuliah">
			<div className="w-full bg-white p-4 rounded-lg shadow-md">
				<h1 className="text-3xl font-bold mb-4">Mata Kuliah</h1>
				{/* Loading Indicator */}
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<Spin size="large" /> {/* Show loading spinner */}
					</div>
				) : (
					<>
						<button
							className="px-2  py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
							onClick={() => {
								setIsModalCreateVisible(true);
							}}>
							Tambah Mata Kuliah
						</button>
						<div className="overflow-x-auto">
							<Table
								columns={columns}
								dataSource={mataKuliahData}
								rowKey="id"
								pagination={false}
								expandable={{
									expandedRowRender: (record) => (
										<Table
											columns={kemampuanAkhirColumns}
											dataSource={record.kemampuan_akhir}
											pagination={false}
											rowKey="id"
										/>
									),
								}}
							/>
						</div>

						<div className="w-full overflow-x-auto"></div>
					</>
				)}
			</div>
			<ModalEditMataKuliah
				isOpen={isModalUpdateVisible}
				editData={editedData}
				onClose={handleModalUpdateClose}
				formulasiCpaDropdown={formulasiCpaDropdown}
				metodePembelajaranDropdown={metodePembelajaranDropdown}
				bentukPembelajaranDropdown={bentukPembelajaranDropdown}
				handleUpdate={handleUpdate}
			/>
			<ModalCreateMataKuliah
				isOpen={isModalCreateVisible}
				onClose={handleModalCreateClose}
				formulasiCpaDropdown={formulasiCpaDropdown}
				metodePembelajaranDropdown={metodePembelajaranDropdown}
				bentukPembelajaranDropdown={bentukPembelajaranDropdown}
				onSave={handleCreateSave}
			/>
		</DefaultLayout>
	);
};

export default MataKuliah;
