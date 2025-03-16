import React, { useContext, useEffect, useState } from "react";
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
import {
	DownloadOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import ImportModal from "../../components/Modal/ImportModal";
import { ProdiContext } from "../../context/ProdiProvider";
import VisibleMenu from "../../components/Menu/VisibleMenu";

const MataKuliah = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	const {
		mataKuliahData,
		formulasiCpaDropdown,
		metodePembelajaranDropdown,
		bentukPembelajaranDropdown,
		loading,
		editedData,
		isModalCreateVisible,
		isModalUpdateVisible,
		isModalImportVisible,
		setIsModalImportVisible,
		handleExportTemplateMataKuliah,
		handleImportMataKuliah,
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
			title: "Tujuan Belajar",
			dataIndex: "tujuan",
			key: "tujuan",
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
						{
							title: "Total",
							render: (_, record, index) => {
								return record.teori_pt + record.teori_bt + record.teori_m;
							},
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
						{
							title: "Total",
							render: (_, record, index) => {
								return record.praktek_pt + record.praktek_bt + record.praktek_m;
							},
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
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
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
				</VisibleMenu>
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

	const tujuanBelajarColumns = [
		{
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
		},
		{ title: "Deskripsi", dataIndex: "deskripsi", key: "deskripsi" },
	];
	return (
		<DefaultLayout title="Mata Kuliah">
			<VisibleMenu allowedRoles={["P2MPP"]}>
				<Select
					placeholder="Pilih Program Studi"
					options={prodiDropdown.map((prodi) => ({
						label: prodi.name,
						value: prodi.id,
					}))}
					defaultValue={selectedProdiId}
					onChange={(value) => handleChangeSelectedProdiId(value)}
					style={{ width: 250 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<div className="w-full bg-white p-4 rounded-lg shadow-md">
				{/* Loading Indicator */}
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<Spin size="large" /> {/* Show loading spinner */}
					</div>
				) : (
					<>
						<div className="mb-4 flex flex-wrap gap-2">
							<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
								<Button
									type="primary"
									icon={<DownloadOutlined />}
									onClick={handleExportTemplateMataKuliah}>
									Download Template
								</Button>

								<Button
									type="default"
									icon={<UploadOutlined />}
									onClick={() => setIsModalImportVisible(true)}>
									Import Mata Kuliah
								</Button>

								<Button
									type="primary"
									icon={<PlusOutlined />}
									onClick={() => {
										setIsModalCreateVisible(true);
									}}>
									Tambah Mata Kuliah
								</Button>
							</VisibleMenu>
						</div>

						<div className="overflow-x-auto">
							<Table
								columns={columns}
								dataSource={mataKuliahData}
								rowKey="id"
								pagination={false}
								expandable={{
									expandedRowRender: (record) => (
										<>
											<h3 className="text-lg font-semibold text-blue-600 mt-4 mb-2">
												Kemampuan Akhir
											</h3>
											<Table
												columns={kemampuanAkhirColumns}
												dataSource={record.kemampuan_akhir}
												pagination={false}
												rowKey="id"
											/>

											<h3 className="text-lg font-semibold text-green-600 mt-6 mb-2">
												Tujuan Belajar
											</h3>
											<Table
												columns={tujuanBelajarColumns}
												dataSource={record.tujuan_belajar}
												pagination={false}
												rowKey="id"
											/>
										</>
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

			<ImportModal
				isOpen={isModalImportVisible}
				setIsOpen={setIsModalImportVisible}
				handleImport={handleImportMataKuliah}
				title="Import Mata Kuliah"
			/>
		</DefaultLayout>
	);
};

export default MataKuliah;
