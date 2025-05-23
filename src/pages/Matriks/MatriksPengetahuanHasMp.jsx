import React, { useContext, useState } from "react";
import { Table, Button, Checkbox, Select, Tooltip } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useMatriksPengetahuanMpData } from "../../hooks/useMatrixPengetahuanMp";
import { AppDataContext } from "../../context/AppDataProvider";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { SaveOutlined } from "@ant-design/icons";

const MatriksPHasMp = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(AppDataContext);
	const {
		loading,
		dataSource,
		pengetahuan,
		updating,
		handleCheckboxChange,
		handleUpdateMatrix,
		handleProdiChange,
	} = useMatriksPengetahuanMpData();

	const columns = [
		{
			title: "MateriPembelajaran",
			dataIndex: "MateriPembelajaran",
			children: [
				{
					title: "Kode",
					dataIndex: "kode",
					key: "kode",
					fixed: "left",
					align: "center",
					width: 100,
				},
				{
					title: "Deskripsi",
					dataIndex: "deskripsi",
					key: "deskripsi",
					fixed: "left",
					align: "center",
					width: 300,
				},
			],
		},
		{
			title: "Pengetahuan (P)",
			children: pengetahuan.map((item, colIndex) => ({
				title: (
					<Tooltip title={item.deskripsi}>
						<span
							style={{
								whiteSpace: "nowrap",
								display: "inline-block",
								minWidth: 50,
								textAlign: "center",
								cursor: "pointer",
							}}>
							{item.kode_pengetahuan}
						</span>
					</Tooltip>
				),
				dataIndex: `col${colIndex + 1}`,
				key: `col${colIndex + 1}`,
				align: "center",
				render: (_, record) => (
					<input
						type="checkbox"
						checked={record[`col${colIndex + 1}`]}
						onChange={(e) =>
							handleCheckboxChange(record.key - 1, colIndex, e.target.checked)
						}
						style={{
							transform: "scale(1.5)",
						}}
					/>
				),
			})),
		},
	];

	const scrollConfig = {
		x: "max-content", // Agar bisa di-scroll secara horizontal jika kolom melebihi lebar tabel
		y: 500, // Tinggi maksimum tabel, agar header tetap terlihat saat di-scroll
	};

	return (
		<DefaultLayout title="Matriks Materi Pembelajaran dan Pengetahuan">
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
			<div className="w-full bg-white overflow-auto p-2">
				<div style={{ marginBottom: "10px", display: "flex", gap: "5px" }}>
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							icon={<SaveOutlined />}
							onClick={handleUpdateMatrix}
							type="primary"
							style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
							loading={updating}>
							Simpan Perubahan
						</Button>
					</VisibleMenu>
				</div>
				<Table
					loading={loading}
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					scroll={scrollConfig}
					bordered
				/>
			</div>
		</DefaultLayout>
	);
};

export default MatriksPHasMp;
