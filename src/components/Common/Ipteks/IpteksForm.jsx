// components/IpteksForm.jsx
import React, { useState } from 'react';

export const IpteksForm = ({ onSave, onCancel }) => {
  const [values, setValues] = useState({
    pengetahuan: '',
    teknologi: '',
    seni: ''
  });

  const handleInputChange = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    const success = await onSave(values);
    if (success) {
      setValues({
        pengetahuan: '',
        teknologi: '',
        seni: ''
      });
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Tambah Data Baru</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ilmu Pengetahuan
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={values.pengetahuan}
            onChange={(e) => handleInputChange('pengetahuan', e.target.value)}
            placeholder="Masukkan ilmu pengetahuan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teknologi
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={values.teknologi}
            onChange={(e) => handleInputChange('teknologi', e.target.value)}
            placeholder="Masukkan teknologi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seni
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={values.seni}
            onChange={(e) => handleInputChange('seni', e.target.value)}
            placeholder="Masukkan seni"
          />
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Simpan
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};