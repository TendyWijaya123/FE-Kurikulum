import React from "react";
import useJejaringPrasyaratMK from "../../../hooks/JejaringMK/useJejaringPrasyaratMK";
import { ReactFlow, Background, Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import SmartStepEdge from "./SmartStepEdge";
import DownloadButton from "./DownloadButton";
import SaveButton from "./SaveButton";
import { Button, Spin } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import GroupNode from "./GroupNode";
import { KategoriMataKuliahEnum } from "../../../enums/KategoriMataKuliahEnum";

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const generateNodes = (mataKuliahData, prodiData) => {
	if (!mataKuliahData || Object.keys(mataKuliahData).length === 0) return [];

	const newNodes = [];
	const maxMKPerSemester = Math.max(
		...Object.values(mataKuliahData).map((mk) => mk.length)
	);

	const widthMataKuliahNodes = 176;
	const widthGapMataKuliahNodes = 64;
	const heightSemesterNodes = 250;
	const heightgapSemesterNodes = 50;
	const gapMataKuliahToTopSemester = 50;
	const widhtSemesterNodes =
		maxMKPerSemester * (widthMataKuliahNodes + widthGapMataKuliahNodes) + 300;
	maxMKPerSemester *
		Object.entries(mataKuliahData).forEach(([semester, mataKuliahs]) => {
			const semesterNumber = Number(semester);
			const semesterId = `semester-${semester}`;

			newNodes.push({
				id: semesterId,
				type: "group",
				data: {
					label: semester ? `Semester ${semester}` : null,
					semester: semesterNumber,
					jenjangProdi: prodiData.jenjang || "",
				},
				position: {
					x: 0,
					y: semesterNumber * (heightSemesterNodes + heightgapSemesterNodes),
				},
				style: {
					width: widhtSemesterNodes,
					height: heightSemesterNodes,
					zIndex: -1,
				},
			});

			mataKuliahs.forEach((mk, index) => {
				const nodeId = `${mk.id}`;
				newNodes.push({
					id: nodeId,
					type: "custom",
					data: {
						label: mk.nama,
						kategori: mk.kategori,
						sks: mk.sks,
						width: widthMataKuliahNodes,
						semester: semesterNumber,
						jenjangProdi: prodiData.jenjang || "",
						subKategori:
							mk.kategori === KategoriMataKuliahEnum.INSTITUSI
								? mk.kategori_mata_kuliah_polban
								: mk.kategori === KategoriMataKuliahEnum.PRODI
								? mk.kategori_mata_kuliah_prodi
								: undefined,
					},
					position: {
						x: index * (widthMataKuliahNodes + widthGapMataKuliahNodes) + 200,
						y:
							semesterNumber * (heightSemesterNodes + heightgapSemesterNodes) +
							gapMataKuliahToTopSemester,
					},
				});
			});
		});

	return newNodes;
};

const generateEdges = (jejaringData) => {
	if (!jejaringData || !Array.isArray(jejaringData)) return [];

	return jejaringData.map(({ from_id, to_id }) => ({
		id: `edge-${from_id}-${to_id}`,
		source: `${from_id}`,
		target: `${to_id}`,
		type: "smart",
		sourceHandle: `source-mk${from_id}-mk${to_id}`,
		targetHandle: `target-mk${to_id}-mk${from_id}`,
		markerEnd: {
			type: "arrowclosed",
		},
		style: { strokeWidth: 4, stroke: getRandomColor() },
	}));
};

const edgeTypes = {
	smart: SmartStepEdge,
};

const nodeTypes = {
	custom: CustomNode,
	group: GroupNode,
};

const JejaringMKDiagram = () => {
	const {
		loading,
		jejaringData,
		mataKuliahData,
		prodiData,
		fetchJejaringPrasyarat,
	} = useJejaringPrasyaratMK();

	if (loading)
		return (
			<div className="flex justify-center items-center h-40">
				<Spin size="large" />
			</div>
		);

	const nodes = generateNodes(mataKuliahData, prodiData);
	const edges = generateEdges(jejaringData);

	return (
		<div className="w-full h-[1000px]">
			<h3 className="font-semibold text-lg mb-2">Legenda Mata Kuliah</h3>
			<div className="flex flex-wrap gap-3 mb-4">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded bg-[#ed7d31]" />
					<span className="text-sm">Prodi - Wajib</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded bg-[#70ad46]" />
					<span className="text-sm">Prodi - Pilihan</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded bg-[#bf9100]" />
					<span className="text-sm">Nasional</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded bg-[#01b0f1]" />
					<span className="text-sm">Institusi - Polban</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded bg-[#c55b11]" />
					<span className="text-sm">Institusi - Polban P/F</span>
				</div>
			</div>
			<Button
				icon={<UndoOutlined />}
				onClick={() => fetchJejaringPrasyarat()}
			/>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					panOnDrag={true}
					zoomOnScroll={false}
					zoomOnDoubleClick
					panOnScroll={false}
					defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
					minZoom={0.5}
					maxZoom={2}
					fitView
					style={{ backgroundColor: "lightgray" }}>
					<Background />
					<Controls />
					<DownloadButton />
					<SaveButton />
				</ReactFlow>
			</ReactFlowProvider>
		</div>
	);
};

export default JejaringMKDiagram;
