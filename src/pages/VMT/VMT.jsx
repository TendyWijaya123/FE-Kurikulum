import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { firstOrCreateVmtJurusan } from "../../service/api";
import VisiJurusan from "../../components/Common/VMT/VisiJurusan";
import MisiJurusan from "../../components/Common/VMT/MisiJurusan";
import useVmt from "../../hooks/Vmt/useVmt";
import VisiPolban from "../../components/Common/VMT/VisiPolban";
import MisiPolban from "../../components/Common/VMT/MisiPolban";
import TujuanPolban from "../../components/Common/VMT/TujuanPolban";
import Accordion from "../../components/Accordion/Accordion";

const VMT = () => {
	return (
		<DefaultLayout title="Visi, Misi Tujuan">
			<div className="font-semibold">
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
