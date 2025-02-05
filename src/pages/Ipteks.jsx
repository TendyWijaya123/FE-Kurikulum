import React, { useState, useContext} from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Pagination } from '@mui/material';
import { useIpteks } from '../hooks/useIpteks';
import { IpteksTable } from '../components/Common/Ipteks/IpteksTable';
import { IpteksForm } from '../components/Common/Ipteks/IpteksForm';
import { AuthContext } from '../context/AuthProvider';

const Ipteks = () => {
  const{user} = useContext(AuthContext);
  const [isAddingNew, setIsAddingNew] = useState(false);
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
    handleUpdate
  } = useIpteks();

  const handleAddNew = () => {
    setIsAddingNew(!isAddingNew);
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <DefaultLayout title="IPTEKS">
      <div className="w-full flex flex-col justify-center items-start pr-10">
        <div className="m-4 w-full bg-white p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleAddNew}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              {isAddingNew ? 'Tutup Form' : 'Tambah Data'}
            </button>
          </div>

          {/* Notification */}
          {notification.message && (
            <div 
              className={`px-4 py-2 rounded mb-4 ${
                notification.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-400' 
                  : 'bg-red-100 text-red-700 border border-red-400'
              }`}
            >
              {notification.message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Table Component */}
          <IpteksTable
            data={ipteksData}
            loading={loading}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />

          {/* Add Form */}
          {isAddingNew && (
            <IpteksForm
              onSave={handleCreate}
              onCancel={handleCancelAdd}
            />
          )}

          {/* Pagination */}
          {!loading && ipteksData.length > 0 && (
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

export default Ipteks;