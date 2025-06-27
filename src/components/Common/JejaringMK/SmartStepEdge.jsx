import React from "react";
import { StepEdge, useEdges, useNodes } from "@reactflow/core";
import {
	SmartEdge,
	pathfindingAStarDiagonal,
	pathfindingAStarNoDiagonal,
	pathfindingJumpPointNoDiagonal,
	svgDrawStraightLinePath,
} from "@tisoap/react-flow-smart-edge";

const getRandomPadding = () => {
	const paddingOptions = [30, 50, 70];
	return paddingOptions[Math.floor(Math.random() * paddingOptions.length)];
};

const StepConfiguration = (getRandomPadding) => {
	return {
		nodePadding: getRandomPadding,
		gridRatio: 2,
		drawEdge: svgDrawStraightLinePath,
		generatePath: pathfindingJumpPointNoDiagonal,
	};
};

const SmartStepEdge = (props) => {
	const nodes = useNodes();
	const stepConfiguration = StepConfiguration(getRandomPadding());

	const customNodes = nodes.filter((node) => node.type === "custom");

	const getNodeById = (id) => customNodes.find((node) => node.id === id);

	const sourceNode = getNodeById(props.source);
	const targetNode = getNodeById(props.target);

	const sourceSemester = sourceNode?.data?.semester;
	const targetSemester = targetNode?.data?.semester;

	let sourcePosition = "bottom";
	let targetPosition = "top";

	if (sourceSemester !== undefined && sourceSemester === targetSemester) {
		sourcePosition = "top";
		targetPosition = "top";
	}

	return (
		<SmartEdge
			{...props}
			options={stepConfiguration}
			nodes={customNodes}
			sourcePosition={sourcePosition}
			targetPosition={targetPosition}
		/>
	);
};

export default SmartStepEdge;
