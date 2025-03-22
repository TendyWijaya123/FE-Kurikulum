import { Handle, Position, useEdges, useNodeId } from "reactflow";

const CustomNode = ({ data }) => {
	const edges = useEdges();
	const nodeId = useNodeId();

	const incomingEdges = edges.filter((edge) => edge.target === nodeId);
	const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

	console.log("edges:", edges);
	console.log("incomingEdges:", incomingEdges);
	console.log("outgoingEdges:", outgoingEdges);

	const getCategoryColor = (kategori) => {
		switch (kategori) {
			case "Nasional":
				return "bg-orange-300";
			case "Institusi":
				return "bg-green-400";
			case "Prodi":
				return "bg-yellow-300";
			default:
				return "bg-white";
		}
	};

	const getHandlePosition = (index, total, position) => {
		if (total === 1) return {}; // Jika hanya satu, tetap default
		const gap = 100 / (total + 1); // Atur jarak antar Handle
		return position === "left" || position === "right"
			? { top: `${gap * (index + 1)}%` }
			: { left: `${gap * (index + 1)}%` };
	};

	return (
		<div className="relative w-40 shadow-md rounded-md bg-white border-2 border-stone-400">
			{/* Handle untuk incoming edges (Target) */}
			{incomingEdges.map((edge, index) => (
				<Handle
					id={`${edge.targetHandle}`}
					type="target"
					position={Position.Top}
					style={getHandlePosition(
						index,
						incomingEdges.length,
						edge.targetHandle
					)}
				/>
			))}

			{/* Node Body */}
			<div
				className={`${getCategoryColor(
					data?.kategori
				)} text-center font-semibold py-2 rounded-t-md`}>
				{data?.label || "Mata Kuliah"}
			</div>

			<div className="border-t-2 border-stone-400"></div>

			<div className="py-2 text-center text-gray-700 font-medium">
				SKS: {Math.round(data?.sks) || 0}
			</div>

			{/* Handle untuk outgoing edges (Source) */}
			{outgoingEdges.map((edge, index) => (
				<Handle
					id={`${edge.sourceHandle}`}
					type="source"
					position={Position.Bottom}
					style={getHandlePosition(
						index,
						outgoingEdges.length,
						edge.sourceHandle
					)}
				/>
			))}
		</div>
	);
};

export default CustomNode;
