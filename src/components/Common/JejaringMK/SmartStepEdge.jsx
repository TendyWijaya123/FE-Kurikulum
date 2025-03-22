import React from "react";
import { StepEdge, useNodes } from "@reactflow/core";
import {
	SmartEdge,
	pathfindingAStarDiagonal,
	pathfindingAStarNoDiagonal,
	pathfindingJumpPointNoDiagonal,
	svgDrawStraightLinePath,
} from "@tisoap/react-flow-smart-edge";

const getRandomPadding = () => {
	const paddingOptions = [40, 50, 60];
	return paddingOptions[Math.floor(Math.random() * paddingOptions.length)];
};

const StepConfiguration = (getRandomPadding) => {
	return {
		nodePadding: getRandomPadding,
		gridRatio: 2,
		drawEdge: svgDrawStraightLinePath,
		generatePath: pathfindingJumpPointNoDiagonal,
		// fallback: StepEdge,
	};
};

const SmartStepEdge = (props) => {
	const nodes = useNodes();
	const stepConfiguration = StepConfiguration(getRandomPadding());
	const customNodes = nodes.filter((node) => node.type === "custom");
	return (
		<SmartEdge
			{...props}
			options={stepConfiguration}
			nodes={customNodes}
			sourcePosition="bottom"
			targetPosition="top"
		/>
	);
};

export default SmartStepEdge;
