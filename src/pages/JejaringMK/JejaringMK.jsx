import { Select, Table, Button } from "antd";
import useJejaringMK from "../../hooks/JejaringMK/useJejaringMK";
import DefaultLayout from "../../layouts/DefaultLayout";
import Accordion from "../../components/Accordion/Accordion";
import JejaringMKTable from "../../components/Common/JejaringMK/JejaringMKTable";
import JejaringMKDiagram from "../../components/Common/JejaringMK/JejaringMKDiagram";
import { AppDataContext } from "../../context/AppDataProvider";
import { useContext } from "react";
import VisibleMenu from "../../components/Menu/VisibleMenu";

const JejaringMK = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(AppDataContext);
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
					style={{ width: 250 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
				<Accordion title="Tabel Prasyarat">
					<JejaringMKTable />
				</Accordion>
			</VisibleMenu>
			<Accordion title="Jejaring MataKuliah">
				<JejaringMKDiagram />
			</Accordion>
		</DefaultLayout>
	);
};

export default JejaringMK;
