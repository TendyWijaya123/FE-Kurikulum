import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { firstOrCreateVmtJurusan } from "../../service/api";
import VisiJurusan from "../../components/Common/VMT/VisiJurusan";
import MisiJurusan from "../../components/Common/VMT/MisiJurusan";
import useVmt from "../../hooks/Vmt/useVmt";

const VMT = () => {
	const { loading } = useVmt();
	return (
		<DefaultLayout title="Visi, Misi Tujuan">
			<div className="font-semibold">
				<VisiJurusan />
				<MisiJurusan />
			</div>
		</DefaultLayout>
	);
};

export default VMT;
