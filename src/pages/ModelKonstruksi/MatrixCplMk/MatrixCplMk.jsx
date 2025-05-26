import { useContext, useState } from "react";
import MatrixCplMkTable from "../../../components/Common/MatrixCplMk/MatrixCplMkTable";
import MatrixCplPTable from "../../../components/Common/MatrixCplP/MatrixCplPTable";
import VisibleMenu from "../../../components/Menu/VisibleMenu";
import { AppDataContext } from "../../../context/AppDataProvider";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { Select } from "antd";
import ProgresButton from "../../../components/Button/ProgresButton";

const MatrixCplMk = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId, handleTandaiSelesai, currendKurikulum } =
		useContext(AppDataContext);
	const [status, setStatus] = useState(`${currendKurikulum?.data.is_matriks_cpl_mk}`);
	const handleChangeStatus = (newStatus) => {
		setStatus(newStatus);
		handleTandaiSelesai("is_matriks_cpl_mk", newStatus);
	}
	return (
		<DefaultLayout title="Matriks CPL-Matakuliah">
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
			<MatrixCplMkTable />
			</div>
		</DefaultLayout>
	);
};

export default MatrixCplMk;
