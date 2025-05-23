import { useContext } from "react";
import MatrixCplPTable from "../../../components/Common/MatrixCplP/MatrixCplPTable";
import { AppDataContext } from "../../../context/AppDataProvider";
import DefaultLayout from "../../../layouts/DefaultLayout";
import VisibleMenu from "../../../components/Menu/VisibleMenu";
import { Select } from "antd";

const MatrixCplP = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(AppDataContext);
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
					style={{ width: 250 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<MatrixCplPTable />
		</DefaultLayout>
	);
};

export default MatrixCplP;
