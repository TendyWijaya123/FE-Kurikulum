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

const VMT = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(AppDataContext);

	return (
		<DefaultLayout title="Visi, Misi dan Tujuan">
			<div className="font-semibold">
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
				<br />
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
