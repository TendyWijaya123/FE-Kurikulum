import React, { useState } from 'react';
import { Spin } from 'antd';



export const IpteksTable = ({ 
  data, 
  loading, 
  onDelete, 
  onUpdate,
  onMultiDelete,
  selectedItems,
  setSelectedItems 
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditedValues({
      kategori: item.kategori,
      deskripsi: item.deskripsi,
      link_sumber: item.link_sumber
    });
  };

  const handleInputChange = (field, value) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (id) => {
    const success = await onUpdate(id, editedValues);
    if (success) {
      setEditingId(null);
      setEditedValues({});
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map(item => item.id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[10vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="w-full table-fixed border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 w-[5%]">
              <input
                type="checkbox"
                checked={data.length > 0 && selectedItems.length === data.length}
                onChange={handleSelectAll}
                className="w-4 h-4"
              />
            </th>
            <th className="p-2 border border-gray-300 w-[15%]">Kategori</th>
            <th className="p-2 border border-gray-300 w-[60%]">Deskripsi</th>
            <th className="p-2 border border-gray-300 w-[10%]">Link Sumber</th>
            <th className="p-2 border border-gray-300 w-[10%]">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border border-gray-300 text-center">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="w-4 h-4"
                />
              </td>
              <td className="p-2 border border-gray-300 ">
                {editingId === item.id ? (
                  <select
                    className="w-full p-1 border rounded"
                    value={editedValues.kategori}
                    onChange={(e) => handleInputChange('kategori', e.target.value)}
                  >
                    <option value="ilmu_pengetahuan">Ilmu Pengetahuan</option>
                    <option value="teknologi">Teknologi</option>
                    <option value="seni">Seni</option>
                  </select>
                ) : (
                  item.kategori
                  .replace('_', ' ')
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ')
                )}
              </td>
              <td className="p-2 border border-gray-300 break-words whitespace-pre-line max-w-xs">
                {editingId === item.id ? (
                  <textarea
                    className="w-full p-1 border rounded"
                    value={editedValues.deskripsi}
                    onChange={(e) => handleInputChange('deskripsi', e.target.value)}
                  />
                ) : (
                  item.deskripsi
                )}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {editingId === item.id ? (
                  <input
                    type="url"
                    className="w-full p-1 border rounded"
                    value={editedValues.link_sumber || ''}
                    onChange={(e) => handleInputChange('link_sumber', e.target.value)}
                  />
                ) : (
                  item.link_sumber ? (
                    <a href={item.link_sumber} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800">
                      Link
                    </a>
                  ) : '-'
                )}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {editingId === item.id ? (
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={() => handleSave(item.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Batal
                    </button>
                  </div>                
                ) : (
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
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
