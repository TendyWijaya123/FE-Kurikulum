import { useState } from "react";

const MyAccordion = ({ data, title, onSave }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editedData, setEditedData] = useState(data);
	const isArray = Array.isArray(data);

	const handleAddPoint = () => {
		setEditedData((prevData) => [
			...prevData,
			{ id: prevData.length + 1, name: "" },
		]);
	};

	const handleDeletePoint = (index) => {
		setEditedData((prevData) => prevData.filter((_, i) => i !== index));
	};

	const handleEdit = (index, value) => {
		const updatedData = [...editedData];
		updatedData[index].name = value;
		setEditedData(updatedData);
	};

	const handleSave = () => {
		onSave(editedData);
		setIsEdit(false);
	};

	return (
		<div className="border-b border-gray-200">
			<div className="flex items-center justify-between py-3">
				<h2 className="text-lg font-semibold">{title}</h2>
				<button
					onClick={() => setIsEdit((prev) => !prev)}
					className="text-blue-500 hover:text-blue-700">
					{isEdit ? "Cancel" : "Edit"}
				</button>
			</div>

			{isEdit ? (
				<div className="p-3">
					{isArray ? (
						<>
							<ol className="list-decimal pl-5 space-y-2">
								{editedData.map((item, index) => (
									<li key={item.id} className="flex items-center space-x-2">
										<input
											type="text"
											value={item.name}
											onChange={(e) => handleEdit(index, e.target.value)}
											className="w-full p-2 border border-gray-300 rounded-md"
										/>
										<button
											onClick={() => handleDeletePoint(index)}
											className="text-red-500 hover:text-red-700">
											Delete
										</button>
									</li>
								))}
							</ol>
							<button
								onClick={handleAddPoint}
								className="mt-2 text-blue-500 hover:text-blue-700">
								Add Point
							</button>
						</>
					) : (
						<input
							type="text"
							value={editedData.name}
							onChange={(e) =>
								setEditedData({ ...editedData, name: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded-md"
						/>
					)}
					<button
						onClick={handleSave}
						className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md">
						Save
					</button>
				</div>
			) : (
				<div className="p-3">
					{isArray ? (
						<ol className="list-decimal pl-5">
							{editedData.map((item) => (
								<li key={item.id}>{item.name}</li>
							))}
						</ol>
					) : (
						<span>{editedData.name}</span>
					)}
				</div>
			)}
		</div>
	);
};

export default MyAccordion;
