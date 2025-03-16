import React, { useContext } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import IlmuPengetahuanTable from "../../components/Common/Ipteks/IlmuPengetahuanTable";
import TeknologiTable from "../../components/Common/Ipteks/TeknologiTable";
import SeniTable from "../../components/Common/Ipteks/SeniTable";
import Accordion from "../../components/Accordion/Accordion";
import { ProdiContext } from "../../context/ProdiProvider";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { Select } from "antd";

const Ipteks = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	return (
		<DefaultLayout title="IPTEKS">
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
			<div className="font-semibold">
				<Accordion title="Ilmu Pengetahuan">
					<IlmuPengetahuanTable />
				</Accordion>

				<Accordion title="Teknologi">
					<TeknologiTable />
				</Accordion>

				<Accordion title="Seni">
					<SeniTable />
				</Accordion>
			</div>
		</DefaultLayout>
	);
};

export default Ipteks;
