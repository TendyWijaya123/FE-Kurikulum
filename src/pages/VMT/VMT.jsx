import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { firstOrCreateVmtJurusan } from "../../service/api";
import VisiJurusan from "../../components/Common/VMT/VisiJurusan";
import MisiJurusan from "../../components/Common/VMT/MisiJurusan";
import useVmt from "../../hooks/Vmt/useVmt";
import VisiPolban from "../../components/Common/VMT/VisiPolban";
import MisiPolban from "../../components/Common/VMT/MisiPolban";
import TujuanPolban from "../../components/Common/VMT/TujuanPolban";

const VMT = () => {
	return (
		<DefaultLayout title="Visi, Misi Tujuan">
			<div className="font-semibold">
				<VisiPolban />
				<MisiPolban />
				<TujuanPolban />
				<VisiJurusan />
				<MisiJurusan />
			</div>
		</DefaultLayout>
	);
};

export default VMT;
