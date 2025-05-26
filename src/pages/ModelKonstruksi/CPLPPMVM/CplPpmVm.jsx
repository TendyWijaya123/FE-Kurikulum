import { useState, useEffect, useContext } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import CplTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/CplTable";
import PpmTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PpmTable";
import PeranIndustriTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PeranIndustriTable";
import Accordion from "../../../components/Accordion/Accordion";
import { AppDataContext } from "../../../context/AppDataProvider";
import { Select } from "antd";
import VisibleMenu from "../../../components/Menu/VisibleMenu";
import ProgresButton from "../../../components/Button/ProgresButton";

const CplPpmVm = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId, handleTandaiSelesai, currendKurikulum  } =
		useContext(AppDataContext);

	const [status, setStatus] = useState(`${currendKurikulum?.data.is_cpl_ppm_vm}`);
	const handleChangeStatus = (newStatus) => {
		setStatus(newStatus);
		handleTandaiSelesai("is_cpl_ppm_vm", newStatus);
	}

	return (
		<DefaultLayout title="CPL-PPM-VM">
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
