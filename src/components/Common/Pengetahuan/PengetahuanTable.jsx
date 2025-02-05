import React, { useState } from 'react';
import { Skeleton } from "@mui/material";

export const PengetahuanTable = ({ 
  data, 
  loading, 
  onDelete, 
  onUpdate 
}) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedValues({
      kode_pengetahuan: row.kode_pengetahuan || '',
      deskripsi: row.deskripsi || '',
      kurikulum_id: row.kurikulum_id
    });
  };

  const handleInputChange = (field, value) => {
    // Don't allow editing of kode_pengetahuan
    if (field === 'kode_pengetahuan') return;
    
    setEditedValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (row) => {
    const success = await onUpdate(row.id, {
      ...editedValues,
      kode_pengetahuan: row.kode_pengetahuan // Ensure code doesn't change
    });
    if (success) {
      setEditingRow(null);
      setEditedValues({});
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedValues({});
  };

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  }

  return (
    <div className="w-full">
      <table className="w-full table-fixed border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-16 p-2 border border-gray-300 text-left text-sm font-semibold text-gray-700">No</th>
            <th className="w-1/4 p-2 border border-gray-300 text-left text-sm font-semibold text-gray-700">Kode</th>
            <th className="w-2/4 p-2 border border-gray-300 text-left text-sm font-semibold text-gray-700">Deskripsi</th>
            <th className="w-1/4 p-2 border border-gray-300 text-center text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td className="p-2 border border-gray-300">{index + 1}</td>
              <td className="p-2 border border-gray-300">
                {row.kode_pengetahuan}
              </td>
              <td className="p-2 border border-gray-300">
                {editingRow === row.id ? (
                  <textarea
                    className="w-full p-1 border rounded resize-y min-h-[60px]"
                    value={editedValues.deskripsi}
                    onChange={(e) => handleInputChange('deskripsi', e.target.value)}
                  />
                ) : (
                  row.deskripsi
                )}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {editingRow === row.id ? (
                  <div className="flex justify-center space-x-2 w-full">
                    <button
                      onClick={() => handleSave(row)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center space-x-2 w-full">
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};