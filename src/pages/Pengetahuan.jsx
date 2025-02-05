// pages/Pengetahuan.jsx
import React, { useState, useContext } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Pagination } from "@mui/material";
import { usePengetahuan } from "../hooks/usePengetahuan";
import { PengetahuanTable } from "../components/Common/Pengetahuan/PengetahuanTable";
import { PengetahuanForm } from "../components/Common/Pengetahuan/PengetahuanForm";
import { AuthContext } from "../context/AuthProvider";
import ImportModal from "../components/Modal/ImportModal";

const Pengetahuan = () => {
	const { user } = useContext(AuthContext);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const {
		pengetahuanData,
		loading,
		error,
		notification,
		currentPage,
		totalPage,
		setCurrentPage,
		handleDelete,
		handleCreate,
		handleUpdate,
		handleExportTemplatePengetahuan,
		handleImportPengetahuan,
	} = usePengetahuan();

	const handleAddNew = () => {
		setIsAddingNew(!isAddingNew);
	};

	const handleCancelAdd = () => {
		setIsAddingNew(false);
	};

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	return (
		<DefaultLayout title="Pengetahuan">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full bg-white p-5 rounded-lg shadow-md">
					<div className="flex justify-start gap-2 items-center mb-4">
						<button
							onClick={handleExportTemplatePengetahuan}
							className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
							Download Template Pengetahuan
						</button>
						<button
							onClick={() => setIsModalImportOpen(true)}
							className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
							Import Pengetahuan
						</button>
						<ImportModal
							isOpen={isModalImportOpen}
							setIsOpen={setIsModalImportOpen}
							handleImport={handleImportPengetahuan}
							title="Import Pengetahuan"
						/>
						<button
							onClick={handleAddNew}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							{isAddingNew ? "Tutup Form" : "Tambah Data"}
						</button>
					</div>

					{notification.message && (
						<div
							className={`px-4 py-2 rounded mb-4 ${
								notification.type === "success"
									? "bg-green-100 text-green-700 border border-green-400"
									: "bg-red-100 text-red-700 border border-red-400"
							}`}>
							{notification.message}
						</div>
					)}

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}

					<PengetahuanTable
						data={pengetahuanData}
						loading={loading}
						onDelete={handleDelete}
						onUpdate={handleUpdate}
					/>

					{isAddingNew && (
						<PengetahuanForm
							onSave={handleCreate}
							onCancel={handleCancelAdd}
							kurikulumId={user?.kurikulumId}
						/>
					)}

					{!loading && pengetahuanData.length > 0 && (
						<div className="flex justify-between mt-4 items-center">
							<Pagination
								count={totalPage}
								page={currentPage}
								onChange={handlePageChange}
							/>
						</div>
					)}
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Pengetahuan;
