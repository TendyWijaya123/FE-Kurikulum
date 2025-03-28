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
import {
	Select,
	Button,
	Input,
	Modal,
	Spin,
	Table,
	Tag,
	Popconfirm,
} from "antd"; // Import Spin from Ant Design
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
		errors,
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
			width: 80,
		},
		{
			title: "Nama Mata Kuliah",
			dataIndex: "nama",
			key: "nama",
			width: 200,
		},
		{
			title: "Kategori",
			dataIndex: "kategori",
			key: "kategori",
			width: 120,
			render: (text) => {
				const categoryColors = {
					Institusi: "blue",
					Prodi: "green",
					Nasional: "gold",
				};

				return text ? (
					<Tag
						color={categoryColors[text] || "default"}
						className="px-2 py-1 rounded-md">
						{text}
					</Tag>
				) : (
					<Tag color="red" className="px-2 py-1 rounded-md">
						Belum Diisi
					</Tag>
				);
			},
		},

		{
			title: "Tujuan Belajar",
			dataIndex: "tujuan",
			key: "tujuan",
			width: 400, // Lebar lebih besar
			render: (text) =>
				text ? (
					text
				) : (
					<Tag color="red" className="px-2 py-1 rounded-md">
						Belum Diisi
					</Tag>
				),
		},
		{
			title: "Semester",
			dataIndex: "semester",
			key: "semester",
			width: 100,
			render: (text) =>
				text ? (
					text
				) : (
					<Tag color="red" className="px-2 py-1 rounded-md">
						Belum Diisi
					</Tag>
				),
		},
		{
			title: "Beban Belajar (Menit/Minggu)",
			children: [
				{
					title: "Teori",
					children: [
						{ title: "BT", dataIndex: "teori_bt", key: "teori_bt", width: 60 },
						{ title: "PT", dataIndex: "teori_pt", key: "teori_pt", width: 60 },
						{ title: "M", dataIndex: "teori_m", key: "teori_m", width: 60 },
						{
							title: "Total",
							width: 80,
							render: (_, record) =>
								record.teori_pt + record.teori_bt + record.teori_m,
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
							width: 60,
						},
						{
							title: "PT",
							dataIndex: "praktek_pt",
							key: "praktek_pt",
							width: 60,
						},
						{ title: "M", dataIndex: "praktek_m", key: "praktek_m", width: 60 },
						{
							title: "Total",
							width: 80,
							render: (_, record) =>
								record.praktek_pt + record.praktek_bt + record.praktek_m,
						},
					],
				},
			],
		},
		{
			title: "Formulasi C, P, A",
			key: "formulasi cpa",
			width: 200,
			render: (_, record) => (
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
			width: 60,
		},
		{
			title: "Total Beban Belajar",
			width: 150,
			render: (_, record) => record.sks * 45,
		},
		{
			title: "Aksi",
			key: "aksi",
			width: 100,
			render: (_, record, index) => (
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<div className="flex gap-2">
						<Button
							type="primary"
							icon={<EditOutlined />}
							onClick={() => handleOnEdit(index)}
						/>

						<Popconfirm
							title="Yakin ingin menghapus?"
							onConfirm={() => handleDelete(record.id)}
							okText="Ya"
							cancelText="Tidak">
							<Button type="primary" danger icon={<DeleteOutline />} />
						</Popconfirm>
					</div>
				</VisibleMenu>
			),
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
						<Spin size="large" />
					</div>
				) : (
					<>
						<div className="mb-4 grid grid-cols-2 gap-2 md:flex md:flex-wrap">
							<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
								<Button
									type="primary"
									icon={<DownloadOutlined />}
									className="text-sm p-2 w-full md:w-auto"
									onClick={handleExportTemplateMataKuliah}>
									Download Template
								</Button>

								<Button
									type="default"
									icon={<UploadOutlined />}
									className="text-sm p-2 w-full md:w-auto"
									onClick={() => setIsModalImportVisible(true)}>
									Import Mata Kuliah
								</Button>

								<Button
									type="primary"
									icon={<PlusOutlined />}
									className="text-sm p-2 w-full md:w-auto"
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
								scroll={{ y: 500 }}
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
				errors={errors}
			/>
			<ModalCreateMataKuliah
				isOpen={isModalCreateVisible}
				onClose={handleModalCreateClose}
				formulasiCpaDropdown={formulasiCpaDropdown}
				metodePembelajaranDropdown={metodePembelajaranDropdown}
				bentukPembelajaranDropdown={bentukPembelajaranDropdown}
				onSave={handleCreateSave}
				errors={errors}
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
