import { useState, useEffect } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import CplTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/CplTable";
import PpmTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PpmTable";
import PeranIndustriTable from "../../../components/Common/Model Konstruksi/CPL-PPM-VM/PeranIndustriTable";
import Accordion from "../../../components/Accordion/Accordion";

const CplPpmVm = () => {
	return (
		<DefaultLayout>
			<div className="flex flex-col gap-2">
				<Accordion title="Daftar CPL">
					<CplTable />
				</Accordion>
				<Accordion title="Daftar PPM">
					<PpmTable />
				</Accordion>
				<Accordion title="Peran Industri">
					<PeranIndustriTable />
				</Accordion>
			</div>
		</DefaultLayout>
	);
};

export default CplPpmVm;
