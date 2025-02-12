import React, { useState, useContext } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Pagination } from "@mui/material";
import { useIpteks } from "../hooks/useIpteks";
import { IpteksTable } from "../components/Common/Ipteks/IpteksTable";
import { IpteksForm } from "../components/Common/Ipteks/IpteksForm";
import { AuthContext } from "../context/AuthProvider";
import ImportModal from "../components/Modal/ImportModal";

const Ipteks = () => {
  const { user } = useContext(AuthContext);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const {
    ipteksData,
    loading,
    error,
    notification,
    currentPage,
    totalPage,
    setCurrentPage,
    handleDelete,
    handleCreate,
    handleUpdate,
    handleExportTemplateIpteks,
    handleImportIpteks,
    handleMultiDelete,
  } = useIpteks();
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);

  return (
    <DefaultLayout title="IPTEKS">
      <div className="w-full flex flex-col justify-center items-start px-4 sm:px-6 lg:px-1">
        <div className="w-full bg-white p-3 sm:p-5 rounded-lg shadow-md">
		<div className="flex flex-col sm:flex-row gap-2 mb-4">
			<button
				onClick={handleExportTemplateIpteks}
				className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
			>
				Download Template
			</button>
			<button
				onClick={() => setIsModalImportOpen(true)}
				className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base w-full sm:w-auto"
			>
				Import IPTEKS
			</button>
			<button
				onClick={() => setIsAddingNew(!isAddingNew)}
				className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
			>
				{isAddingNew ? "Tutup Form" : "Tambah Data"}
			</button>
			{selectedItems.length > 0 && (
				<button
				onClick={() => {
					handleMultiDelete(selectedItems);
					setSelectedItems([]);
				}}
				className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm sm:text-base w-full sm:w-auto"
				>
				Hapus {selectedItems.length} Item
				</button>
			)}
		</div>

          <ImportModal
            isOpen={isModalImportOpen}
            setIsOpen={setIsModalImportOpen}
            handleImport={handleImportIpteks}
            title="Import IPTEKS"
          />

          {notification.message && (
            <div
              className={`px-4 py-2 rounded mb-4 text-sm sm:text-base ${
                notification.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-red-100 text-red-700 border border-red-400"
              }`}
            >
              {notification.message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
              {error}
            </div>
          )}

          <div className="overflow-x-auto mb-6">
            <IpteksTable
              data={ipteksData}
              loading={loading}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onMultiDelete={handleMultiDelete}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>

          {!loading && ipteksData.length > 0 && (
            <div className="flex justify-center sm:justify-between mt-4 mb-6 items-center overflow-x-auto py-2">
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                size="small"
                className="min-w-full sm:min-w-0"
              />
            </div>
          )}

          {isAddingNew && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <IpteksForm 
                onSave={handleCreate} 
                onCancel={() => setIsAddingNew(false)} 
              />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Ipteks;