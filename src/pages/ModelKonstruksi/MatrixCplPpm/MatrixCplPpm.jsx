import { useContext } from "react";
import MatrixCplPpmTable from "../../../components/Common/MatrixCplPpm/MatrixCplPpmTable";
import { ProdiContext } from "../../../context/ProdiProvider";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { Select } from "antd";
import VisibleMenu from "../../../components/Menu/VisibleMenu";

const MatrixCplPpm = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	return (
		<DefaultLayout title="Matriks CPL-PPM">
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
			<MatrixCplPpmTable />
		</DefaultLayout>
	);
};

export default MatrixCplPpm;
