// components/IpteksTable.jsx
import React, { useState } from 'react';
import { Skeleton } from "@mui/material";

export const IpteksTable = ({ 
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
      pengetahuan: row.pengetahuan?.ilmu_pengetahuan || '',
      teknologi: row.teknologi?.teknologi || '',
      seni: row.seni?.seni || ''
    });
  };

  const handleInputChange = (field, value) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (row) => {
    const success = await onUpdate(row, editedValues);
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
        <colgroup>
          <col className="w-[5%]" />
          <col className="w-[25%]" />
          <col className="w-[25%]" />
          <col className="w-[25%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 text-left text-sm font-semibold text-gray-700">No</th>
            <th className="p-2 border border-gray-300 text-left text-sm font-semibold text-gray-700">Ilmu Pengetahuan</th>
            <th className="p-2 border border-gray-300 text-left text-sm font-semibold text-gray-700">Teknologi</th>
            <th className="p-2 border border-gray-300 text-left text-sm font-semibold text-gray-700">Seni</th>
            <th className="p-2 border border-gray-300 text-center text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border border-gray-300 align-top">{row.id}</td>
              <td className="p-2 border border-gray-300">
                {editingRow === row.id ? (
                  <textarea
                    className="w-full p-1 border rounded resize-y min-h-[60px]"
                    value={editedValues.pengetahuan}
                    onChange={(e) => handleInputChange('pengetahuan', e.target.value)}
                    style={{ maxWidth: '100%', wordWrap: 'break-word' }}
                  />
                ) : (
                  <div className="w-full" style={{ wordBreak: 'break-word' }}>
                    {row.pengetahuan?.ilmu_pengetahuan || '-'}
                  </div>
                )}
              </td>
              <td className="p-2 border border-gray-300">
                {editingRow === row.id ? (
                  <textarea
                    className="w-full p-1 border rounded resize-y min-h-[60px]"
                    value={editedValues.teknologi}
                    onChange={(e) => handleInputChange('teknologi', e.target.value)}
                    style={{ maxWidth: '100%', wordWrap: 'break-word' }}
                  />
                ) : (
                  <div className="w-full" style={{ wordBreak: 'break-word' }}>
                    {row.teknologi?.teknologi || '-'}
                  </div>
                )}
              </td>
              <td className="p-2 border border-gray-300">
                {editingRow === row.id ? (
                  <textarea
                    className="w-full p-1 border rounded resize-y min-h-[60px]"
                    value={editedValues.seni}
                    onChange={(e) => handleInputChange('seni', e.target.value)}
                    style={{ maxWidth: '100%', wordWrap: 'break-word' }}
                  />
                ) : (
                  <div className="w-full" style={{ wordBreak: 'break-word' }}>
                    {row.seni?.seni || '-'}
                  </div>
                )}
              </td>
              <td className="p-2 border border-gray-300 text-center align-top">
                {editingRow === row.id ? (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleSave(row)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(row)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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