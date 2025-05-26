import { Select, Table, Button } from "antd";
import useJejaringMK from "../../hooks/JejaringMK/useJejaringMK";
import DefaultLayout from "../../layouts/DefaultLayout";
import Accordion from "../../components/Accordion/Accordion";
import JejaringMKTable from "../../components/Common/JejaringMK/JejaringMKTable";
import JejaringMKDiagram from "../../components/Common/JejaringMK/JejaringMKDiagram";
import { AppDataContext } from "../../context/AppDataProvider";
import { useContext, useState } from "react";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import ProgresButton from "../../components/Button/ProgresButton";

const JejaringMK = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId, handleTandaiSelesai, currendKurikulum } =
					useContext(AppDataContext);
	const [status, setStatus] = useState(`${currendKurikulum?.data.is_jejaring_mata_kuliah}`);
	const handleChangeStatus = (newStatus) => {
		setStatus(newStatus);
		handleTandaiSelesai("is_jejaring_mata_kuliah", newStatus);
	}
	return (
		<DefaultLayout title="Jejaring Mata Kuliah">
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
			<div className="p-2 bg-white w-full overflow-x-auto">
				<div className="ml-auto ">
					<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
						<ProgresButton status={status} onChange={handleChangeStatus} />
					</VisibleMenu>
				</div>
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Accordion title="Tabel Prasyarat">
						<JejaringMKTable />
					</Accordion>
				</VisibleMenu>
				<Accordion title="Jejaring MataKuliah">
					<JejaringMKDiagram />
				</Accordion>
			</div>
		</DefaultLayout>
	);
};

export default JejaringMK;
