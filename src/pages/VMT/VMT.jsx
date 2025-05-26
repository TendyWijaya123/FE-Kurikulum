import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { firstOrCreateVmtJurusan } from "../../service/api";
import VisiJurusan from "../../components/Common/VMT/VisiJurusan";
import MisiJurusan from "../../components/Common/VMT/MisiJurusan";
import useVmt from "../../hooks/Vmt/useVmt";
import VisiPolban from "../../components/Common/VMT/VisiPolban";
import MisiPolban from "../../components/Common/VMT/MisiPolban";
import TujuanPolban from "../../components/Common/VMT/TujuanPolban";
import Accordion from "../../components/Accordion/Accordion";
import { AppDataContext } from "../../context/AppDataProvider";
import { Select } from "antd";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import ProgresButton from "../../components/Button/ProgresButton";

const VMT = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId, handleTandaiSelesai, currendKurikulum } =
		useContext(AppDataContext);
	
	const [status, setStatus] = useState(`${currendKurikulum?.data.is_vmt}`);
	const handleChangeStatus = (newStatus) => {
		setStatus(newStatus);
		handleTandaiSelesai("is_vmt", newStatus);
	};

	return (
		<DefaultLayout title="Visi, Misi dan Tujuan">
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
			<div className="bg-white font-semibold">
				<div className="ml-auto ">
					<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
						<ProgresButton status={status} onChange={handleChangeStatus} />
					</VisibleMenu>
				</div>
				<Accordion title="Visi Polban">
					<VisiPolban />
				</Accordion>
				<Accordion title="Misi Polban">
					<MisiPolban />
				</Accordion>
				<Accordion title="Tujuan Polban">
					<TujuanPolban />
				</Accordion>
				<Accordion title="Visi Jurusan dan Visi Keilmuan Prodi">
					<VisiJurusan />
				</Accordion>
				<Accordion title="Misi Jurusan">
					<MisiJurusan />
				</Accordion>
			</div>
		</DefaultLayout>
	);
};

export default VMT;
