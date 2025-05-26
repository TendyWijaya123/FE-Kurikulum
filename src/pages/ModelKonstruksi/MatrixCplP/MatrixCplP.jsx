import { useContext, useState } from "react";
import MatrixCplPTable from "../../../components/Common/MatrixCplP/MatrixCplPTable";
import { AppDataContext } from "../../../context/AppDataProvider";
import DefaultLayout from "../../../layouts/DefaultLayout";
import VisibleMenu from "../../../components/Menu/VisibleMenu";
import { Select } from "antd";
import ProgresButton from "../../../components/Button/ProgresButton";

const MatrixCplP = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId, handleTandaiSelesai, currendKurikulum } =
				useContext(AppDataContext);
	const [status, setStatus] = useState(`${currendKurikulum?.data.is_matriks_cpl_p}`);
	const handleChangeStatus = (newStatus) => {
		setStatus(newStatus);
		handleTandaiSelesai("is_matriks_cpl_p", newStatus);
	}
	return (
		<DefaultLayout title="Matriks CPL-P">
			<VisibleMenu allowedRoles={"P2MPP"}>
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
				<MatrixCplPTable />
			</div>
		</DefaultLayout>
	);
};

export default MatrixCplP;
