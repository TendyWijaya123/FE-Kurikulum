import React from "react";
import useJejaringPrasyaratMK from "../../../hooks/JejaringMK/useJejaringPrasyaratMK";
import { ReactFlow, Background, Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import SmartStepEdge from "./SmartStepEdge";

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const generateNodes = (mataKuliahData) => {
	if (!mataKuliahData || Object.keys(mataKuliahData).length === 0) return [];

	const newNodes = [];
	const maxMKPerSemester = Math.max(
		...Object.values(mataKuliahData).map((mk) => mk.length)
	);

	Object.entries(mataKuliahData).forEach(([semester, mataKuliahs]) => {
		const semesterNumber = Number(semester);
		const semesterId = `semester-${semester}`;

		newNodes.push({
			id: semesterId,
			type: "group",
			data: { label: `Semester ${semester}` },
			position: { x: 0, y: semesterNumber * 250 },
			style: {
				width: maxMKPerSemester * 200 + 200,
				height: 200,
				zIndex: -1,
			},
		});

		mataKuliahs.forEach((mk, index) => {
			const nodeId = `mk-${mk.id}`;

			newNodes.push({
				id: nodeId,
				type: "custom",
				data: { label: mk.nama, kategori: mk.kategori, sks: mk.sks },
				position: { x: index * 200 + 200, y: semesterNumber * 250 + 50 },
			});
		});
	});

	return newNodes;
};

const generateEdges = (jejaringData) => {
	if (!jejaringData || !Array.isArray(jejaringData)) return [];

	return jejaringData.map(({ from_id, to_id }) => ({
		id: `edge-${from_id}-${to_id}`,
		source: `mk-${from_id}`,
		target: `mk-${to_id}`,
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

const JejaringMKDiagram = () => {
	const nodeTypes = {
		custom: CustomNode,
		group: ({ data }) => (
			<div className="w-full h-full flex items-center border border-gray-400 bg-white">
				<h2 className="h-full text-lg font-bold bg-yellow-300 border-r border-gray-400 flex items-center leading-none">
					{data.label}
				</h2>
				<div className="flex-1"></div>
			</div>
		),
	};

	const { loading, jejaringData, mataKuliahData } = useJejaringPrasyaratMK();

	if (loading) return <p>Loading...</p>;

	const nodes = generateNodes(mataKuliahData);
	const edges = generateEdges(jejaringData);

	return (
		<div className="w-full h-[1000px]">
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
					fitView>
					<Background />
					<Controls />
				</ReactFlow>
			</ReactFlowProvider>
		</div>
	);
};

export default JejaringMKDiagram;
