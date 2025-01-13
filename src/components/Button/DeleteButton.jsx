import React, { useState } from "react";

const DeleteButton = ({ onDelete, className = "", children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			{/* Tombol hapus dengan styling dinamis */}
			<button onClick={openModal} className={` ${className}`}>
				{children}
			</button>

			{/* Modal dengan styling dinamis */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div
						className="bg-gray-500 bg-opacity-75 absolute inset-0"
						onClick={closeModal}></div>
					<div className="relative bg-white rounded-lg w-96 p-6 z-10">
						<h2 className="text-xl font-semibold text-center mb-4">
							Are you sure you want to delete this item?
						</h2>
						<div className="flex justify-end space-x-4">
							<button
								onClick={closeModal}
								className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none">
								Cancel
							</button>
							<button
								onClick={() => {
									onDelete();
									closeModal();
								}}
								className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none">
								Yes, Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DeleteButton;
