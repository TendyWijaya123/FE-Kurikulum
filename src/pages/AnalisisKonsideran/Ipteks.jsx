import React, { useContext, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import IlmuPengetahuanTable from "../../components/Common/Ipteks/IlmuPengetahuanTable";
import TeknologiTable from "../../components/Common/Ipteks/TeknologiTable";
import SeniTable from "../../components/Common/Ipteks/SeniTable";
import Accordion from "../../components/Accordion/Accordion";
import { AppDataContext } from "../../context/AppDataProvider";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { Select } from "antd";
import ProgresButton from "../../components/Button/ProgresButton";

const Ipteks = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId, handleTandaiSelesai, currendKurikulum } =
		useContext(AppDataContext);

	const [statusIpteks, setStatusIpteks] = useState(`${currendKurikulum?.data.is_ipteks}`);
	const handleChangeStatusIpteks = (newStatus) => {
		setStatusIpteks(newStatus);
		handleTandaiSelesai("is_ipteks", newStatus);
	};
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
					style={{ width: 250, marginBottom: 10 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<div className="bg-white font-semibold">
				<div className="ml-auto ">
					<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
						<ProgresButton status={statusIpteks} onChange={handleChangeStatusIpteks} />
					</VisibleMenu>
				</div>
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
