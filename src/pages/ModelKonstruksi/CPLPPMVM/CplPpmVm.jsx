import { useState, useEffect } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import CplTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/CplTable";
import PpmTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PpmTable";
import PeranIndustriTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PeranIndustriTable";

const CplPpmVm = () => {
	return (
		<DefaultLayout>
			<div className="flex flex-col gap-2">
				<CplTable />
				<PpmTable />
				<PeranIndustriTable />
			</div>
		</DefaultLayout>
	);
};

export default CplPpmVm;
