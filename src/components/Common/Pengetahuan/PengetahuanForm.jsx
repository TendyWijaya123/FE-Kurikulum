import React, { useState } from 'react';

export const PengetahuanForm = ({ onSave, onCancel }) => {
  const [values, setValues] = useState({
    deskripsi: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi wajib diisi.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const success = await onSave({ deskripsi: values.deskripsi });
    if (success) {
      setValues({ deskripsi: '' });
      onCancel();
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Tambah Data Pengetahuan</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            className={`w-full px-3 py-2 border rounded-md ${
              errors.deskripsi ? 'border-red-500' : 'border-gray-300'
            }`}
            value={values.deskripsi}
            onChange={(e) => handleInputChange('deskripsi', e.target.value)}
            placeholder="Masukkan deskripsi"
            rows={4}
          />
          {errors.deskripsi && (
            <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>
          )}
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