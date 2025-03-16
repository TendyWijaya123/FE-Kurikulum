import React, { useContext, useState } from "react";
import { Table, Button, Checkbox, Select } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useMatriksCplIeaData } from "../../hooks/useMatriksCplIeaData";
import { ProdiContext } from "../../context/ProdiProvider";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { SaveOutlined } from "@ant-design/icons";

const MatriksCplHasIea = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
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
			dataIndex: "rowHeader",
			key: "rowHeader",
			fixed: "left",
			align: "center",
		},
		{
			title: "CPL Berdasarkan IEA",
			children: iea.map((item, colIndex) => ({
				title: item.code,
				dataIndex: `col${colIndex + 1}`,
				key: `col${colIndex + 1}`,
				align: "center",
				render: (_, record) => (
					<Checkbox
						checked={record[`col${colIndex + 1}`]}
						onChange={(e) =>
							handleCheckboxChange(record.key - 1, colIndex, e.target.checked)
						}
						style={{
							transform: "scale(1.2)",
						}}
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
					style={{ width: 250 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<div className="w-full overflow-x-auto bg-white p-3">
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
						`
					</VisibleMenu>
				</div>
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
