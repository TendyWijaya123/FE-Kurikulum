import { Handle, Position, useEdges, useNodeId } from "reactflow";
import { KategoriMataKuliahEnum } from "../../../enums/KategoriMataKuliahEnum";
import { KategoriMataKuliahPolbanEnum } from "../../../enums/KategoriMataKuliahPolbanEnum";
import { KategoriMataKuliahProdiEnum } from "../../../enums/KategoriMataKuliahProdiEnum";
import { Tooltip } from "antd";

const getCategoryColor = (kategori, subKategori) => {
	if (kategori === KategoriMataKuliahEnum.INSTITUSI) {
		switch (subKategori) {
			case KategoriMataKuliahPolbanEnum.POLBAN:
				return "bg-[#01b0f1]";
			case KategoriMataKuliahPolbanEnum.POLBANPF:
				return "bg-[#c55b11]";
			default:
				return "bg-[#01b0f1]";
		}
	}

	if (kategori === KategoriMataKuliahEnum.PRODI) {
		switch (subKategori) {
			case KategoriMataKuliahProdiEnum.WAJIB:
				return "bg-[#ed7d31]";
			case KategoriMataKuliahProdiEnum.PILIHAN:
				return "bg-[#70ad46]";
			default:
				return "bg-[#ed7d31]";
		}
	}

	if (kategori === KategoriMataKuliahEnum.NASIONAL) {
		return "bg-[#bf9100]";
	}

	return "bg-white";
};

const isValidSemester = (kategori, subKategori, semester, jenjangProdi) => {
	const { INSTITUSI, PRODI, NASIONAL } = KategoriMataKuliahEnum;
	const { WAJIB, MAGANG, PILIHAN } = KategoriMataKuliahProdiEnum;
	const { POLBAN, POLBANPF } = KategoriMataKuliahPolbanEnum;

	let allowed = [];

	if (jenjangProdi === "D3") {
		if ([1, 2].includes(semester)) {
			allowed = [
				{ kategori: INSTITUSI },
				{ kategori: PRODI },
				{ kategori: NASIONAL },
			];
		} else if ([3, 4].includes(semester)) {
			allowed = [{ kategori: PRODI }, { kategori: NASIONAL }];
		} else if (semester === 5) {
			allowed = [{ kategori: PRODI, subKategori: MAGANG }];
		} else if (semester === 6) {
			allowed = [{ kategori: PRODI }, { kategori: NASIONAL }];
		}
	}

	if (jenjangProdi === "D4") {
		if ([1, 2].includes(semester)) {
			allowed = [
				{ kategori: INSTITUSI },
				{ kategori: PRODI },
				{ kategori: NASIONAL },
			];
		} else if ([3, 4, 5].includes(semester)) {
			allowed = [{ kategori: PRODI }, { kategori: NASIONAL }];
		} else if (semester === 6) {
			allowed = [{ kategori: PRODI, subKategori: MAGANG }];
		} else if (semester === 7) {
			allowed = [{ kategori: PRODI, subKategori: PILIHAN }];
		} else if (semester === 8) {
			allowed = [
				{ kategori: PRODI, subKategori: "Tugas Akhir" },
				{ kategori: NASIONAL },
			];
		}
	}

	if (jenjangProdi === "S2") {
		if ([1, 2].includes(semester)) {
			allowed = [
				{ kategori: KategoriMataKuliahEnum.INSTITUSI },
				{ kategori: KategoriMataKuliahEnum.NASIONAL },
			];
		} else if ([3, 4].includes(semester)) {
			allowed = [{ kategori: KategoriMataKuliahEnum.PRODI }];
		}
	}

	const isValid = allowed.some((allow) => {
		if (allow.kategori !== kategori) return false;
		if (!("subKategori" in allow)) return true;
		return allow.subKategori === subKategori;
	});

	const allowedText = allowed
		.map((a) =>
			a.subKategori ? `${a.kategori} (${a.subKategori})` : `${a.kategori}`
		)
		.join(", ");

	const message = isValid
		? null
		: `Kategori "${kategori}"${
				subKategori ? ` (sub: ${subKategori})` : ""
		  } tidak diperbolehkan untuk jenjang ${jenjangProdi} semester ${semester}.
Kategori yang diperbolehkan: ${allowedText}`;

	return { isValid, message };
};

const CustomNode = ({ data }) => {
	const edges = useEdges();
	const nodeId = useNodeId();
	const incomingEdges = edges.filter((edge) => edge.target === nodeId);
	const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

	const { isValid, message } = isValidSemester(
		data?.kategori,
		data?.subKategori,
		data?.semester,
		data?.jenjangProdi
	);

	const categoryColor = isValid
		? getCategoryColor(data?.kategori, data?.subKategori)
		: "bg-red-500";

	const getHandlePosition = (index, total, position) => {
		if (total === 1) return {};
		const gap = 100 / (total + 1);
		return position === "left" || position === "right"
			? { top: `${gap * (index + 1)}%` }
			: { left: `${gap * (index + 1)}%` };
	};

	return (
		<Tooltip title={!isValid ? message : null} color="red">
			<div
				className="shadow-md rounded-md bg-white border-2 border-stone-400"
				style={{ width: data?.width || 176 }}>
				{incomingEdges.map((edge, index) => (
					<Handle
						key={`target-${index}`}
						id={`${edge.targetHandle}`}
						type="target"
						position={Position.Top}
						style={getHandlePosition(index, incomingEdges.length, "top")}
					/>
				))}

				{/* Header */}
				<div
					className={`${categoryColor} text-center font-semibold py-2 rounded-t-md text-xl text-white`}>
					{data?.label || ""}
				</div>

				{/* SKS Info */}
				<div className="border-t-2 border-stone-400"></div>
				<div className="py-2 text-center text-gray-700 font-medium">
					SKS: {Math.round(data?.sks) || 0}
				</div>

				{/* Outgoing Handles */}
				{outgoingEdges.map((edge, index) => (
					<Handle
						key={`source-${index}`}
						id={`${edge.sourceHandle}`}
						type="source"
						position={Position.Bottom}
						style={getHandlePosition(index, outgoingEdges.length, "bottom")}
					/>
				))}
			</div>
		</Tooltip>
	);
};

export default CustomNode;
