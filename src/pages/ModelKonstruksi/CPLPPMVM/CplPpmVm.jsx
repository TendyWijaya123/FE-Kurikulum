import { useState, useEffect, useContext } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import CplTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/CplTable";
import PpmTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PpmTable";
import PeranIndustriTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PeranIndustriTable";
import Accordion from "../../../components/Accordion/Accordion";
import { ProdiContext } from "../../../context/ProdiProvider";
import { Select } from "antd";
import VisibleMenu from "../../../components/Menu/VisibleMenu";

const CplPpmVm = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	return (
		<DefaultLayout title="CPL-PPM-VM">
			<div className="flex flex-col gap-2">
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
				<Accordion title="Daftar CPL">
					<CplTable />
				</Accordion>
				<Accordion title="Daftar PPM">
					<PpmTable />
				</Accordion>
				<Accordion title="Peran Industri">
					<PeranIndustriTable />
				</Accordion>
			</div>
		</DefaultLayout>
	);
};

export default CplPpmVm;
