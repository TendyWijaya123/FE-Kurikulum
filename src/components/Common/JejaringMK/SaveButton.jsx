import React from "react";
import {
	Panel,
	useReactFlow,
	getRectOfNodes,
	getTransformForBounds,
} from "reactflow";
import { toPng } from "html-to-image";
import { uploadJejaringMataKuliahDiagram } from "../../../service/JejaringMataKuliah/JejaringMataKuliahService";
import { message } from "antd";

const imageWidth = 2048;
const imageHeight = 1536;

function SaveButton() {
	const { getNodes } = useReactFlow();

	const onClick = async () => {
		const nodesBounds = getRectOfNodes(getNodes());
		const transform = getTransformForBounds(
			nodesBounds,
			imageWidth,
			imageHeight,
			0.5,
			2
		);

		try {
			const dataUrl = await toPng(
				document.querySelector(".react-flow__viewport"),
				{
					backgroundColor: "lightgray",
					width: imageWidth,
					height: imageHeight,
					style: {
						width: imageWidth,
						height: imageHeight,
						transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
					},
				}
			);

			const blob = await fetch(dataUrl).then((res) => res.blob());

			// Konversi Blob ke File agar nama file dikirim ke backend
			const file = new File([blob], "jejaring-mata-kuliah.png", {
				type: "image/png",
			});

			const formData = new FormData();
			formData.append("gambar", file);

			await uploadJejaringMataKuliahDiagram(formData);

			message.success("Gambar berhasil diunggah ke server");
		} catch (error) {
			console.error("Error uploading image:", error);
			message.error("Gagal mengunggah gambar");
		}
	};

	return (
		<Panel position="top-left">
			<button className="save-btn bg-green-300" onClick={onClick}>
				Save Gambar
			</button>
		</Panel>
	);
}

export default SaveButton;
