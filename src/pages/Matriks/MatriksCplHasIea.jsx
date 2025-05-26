import React, { useContext, useState } from "react";
import { Table, Button, Checkbox, Select, Tooltip } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useMatriksCplIeaData } from "../../hooks/useMatriksCplIeaData";
import { AppDataContext } from "../../context/AppDataProvider";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { SaveOutlined } from "@ant-design/icons";
import ProgresButton from "../../components/Button/ProgresButton";

const MatriksCplHasIea = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId, handleTandaiSelesai, currendKurikulum } =
			useContext(AppDataContext);
	const [status, setStatus] = useState(`${currendKurikulum?.data.is_matriks_cpl_iea}`);
	const handleChangeStatus = (newStatus) => {
		setStatus(newStatus);
		handleTandaiSelesai("is_matriks_cpl_iea", newStatus);
	}
	const {
		loading,
		dataSource,
		iea,
		updating,
		handleCheckboxChange,
		handleUpdateMatrix,
		handleProdiChange,
	} = useMatriksCplIeaData();

	const columns = [
		{
			title: "CPL",
			children: [
				{
					title: "Kode",
					dataIndex: "kode",
					key: "kode",
					fixed: "left",
					width: 100,
					minWidth: 100,
				},
				{
					title: "Deskripsi",
					dataIndex: "deskripsi",
					key: "deskripsi",
					fixed: "left",
					width: 300,
					minWidth: 200,
				},
			],
		},
		{
			title: "IEA",
			children: iea.map((item, colIndex) => ({
				title: (
					<Tooltip title={item.deskripsi || item.keterangan || item.description || "-"}>
						<span style={{ whiteSpace: "nowrap", display: "inline-block", minWidth: 50, textAlign: "center", cursor: "pointer" }}>
							{item.code}
						</span>
					</Tooltip>
				),
				dataIndex: `col${colIndex + 1}`,
				key: `col${colIndex + 1}`,
				align: "center",
				width: 80,
				minWidth: 80,
				render: (_, record) => (
					<input
						type="checkbox"
						checked={record[`col${colIndex + 1}`]}
						onChange={(e) =>
							handleCheckboxChange(record.key - 1, colIndex, e.target.checked)
						}
						style={{ transform: "scale(1.5)" }}
					/>
				),
			})),
		},
	];

	return (
		<DefaultLayout title="Matriks CPL Berdasarkan IEA">
			<VisibleMenu allowedRoles={["P2MPP"]}>
				<Select
					placeholder="Pilih Program Studi"
					options={prodiDropdown.map((prodi) => ({
						label: prodi.name,
						value: prodi.id,
					}))}
					defaultValue={selectedProdiId}
					onChange={(value) => handleChangeSelectedProdiId(value)}
					style={{ width: 250, marginBottom: 10 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<div className="bg-white font-semiboldx">
				<div className="ml-auto ">
					<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
						<ProgresButton status={status} onChange={handleChangeStatus} />
					</VisibleMenu>
				</div>
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Button
						icon={<SaveOutlined />}
						onClick={handleUpdateMatrix}
						type="primary"
						style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", marginLeft: 10, marginBottom: 10 }}
						loading={updating}>
						Simpan Perubahan
					</Button>
					`
				</VisibleMenu>
				<Table
					loading={loading}
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					bordered
					scroll={{ x: "max-content" }}
					/>
			</div>
		</DefaultLayout>
	);
};

export default MatriksCplHasIea;
