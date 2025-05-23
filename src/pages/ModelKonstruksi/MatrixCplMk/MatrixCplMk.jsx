import { useContext } from "react";
import MatrixCplMkTable from "../../../components/Common/MatrixCplMk/MatrixCplMkTable";
import MatrixCplPTable from "../../../components/Common/MatrixCplP/MatrixCplPTable";
import VisibleMenu from "../../../components/Menu/VisibleMenu";
import { AppDataContext } from "../../../context/AppDataProvider";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { Select } from "antd";

const MatrixCplMk = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(AppDataContext);
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
					style={{ width: 250 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<MatrixCplMkTable />
		</DefaultLayout>
	);
};

export default MatrixCplMk;
