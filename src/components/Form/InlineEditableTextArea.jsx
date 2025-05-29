import { useState, useEffect } from "react";
import { Form, Input } from "antd";

const InlineEditableTextArea = ({
	value,
	onSave,
	autoSize = { minRows: 1, maxRows: 4 },
	style = {},
	placeholder = "Tulis sesuatu...",
}) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleChange = (e) => {
		setLocalValue(e.target.value);
	};

	const handleBlur = () => {
		if (localValue !== value) {
			onSave(localValue);
		}
	};

	return (
		<Form.Item style={{ marginBottom: 0 }}>
			<Input.TextArea
				value={localValue}
				onChange={handleChange}
				onBlur={handleBlur}
				autoSize={autoSize}
				style={{
					border: "none",
					outline: "none",
					boxShadow: "none",
					padding: 0,
					resize: "none",
					...style,
				}}
				placeholder={placeholder}
			/>
		</Form.Item>
	);
};

export default InlineEditableTextArea;
