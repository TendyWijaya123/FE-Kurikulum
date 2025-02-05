import React, { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { UpdateOutlined } from "@mui/icons-material";
import { importCPL } from "../../service/Import/ImportService";

const ImportModal = ({ isOpen, setIsOpen, handleImport, title }) => {
	const [fileList, setFileList] = useState([]);

	const handleChange = ({ fileList }) => setFileList(fileList);

	const handleSubmit = async () => {
		if (fileList.length === 0) {
			message.warning("Silakan pilih file terlebih dahulu!");
			return;
		}

		const file = fileList[0].originFileObj;
		try {
			await handleImport(file);
			setIsOpen(false);
			setFileList([]);
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	return (
		<Modal
			open={isOpen}
			onCancel={() => setIsOpen(false)}
			onOk={handleSubmit}
			title={title}>
			<Upload
				accept=".xlsx, .csv"
				maxCount={1}
				fileList={fileList}
				beforeUpload={() => false}
				onChange={handleChange}>
				<Button icon={<UpdateOutlined />}>Masukkan file</Button>
			</Upload>
		</Modal>
	);
};

export default ImportModal;
