import React, { useState, useRef, useEffect } from 'react';

export const IpteksForm = ({ onSave, onCancel }) => {
  const [values, setValues] = useState({
    kategori: 'ilmu_pengetahuan',
    deskripsi: '',
    link_sumber: ''
  });

  const deskripsiRef = useRef(null);

  useEffect(() => {
    if (deskripsiRef.current) {
      deskripsiRef.current.focus();
    }
  }, []);

  const handleInputChange = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave(values);
    if (success) {
      setValues({
        kategori: 'ilmu_pengetahuan',
        deskripsi: '',
        link_sumber: ''
      });
      if (deskripsiRef.current) {
        deskripsiRef.current.focus();
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="text-xl font-bold mb-4 text-center">
        Tambah IPTEKS Baru
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <div className="mb-2 block text-sm font-bold text-gray-700">
            Kategori
          </div>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={values.kategori}
            onChange={(e) => handleInputChange('kategori', e.target.value)}
            required
          >
            <option value="ilmu_pengetahuan">Ilmu Pengetahuan</option>
            <option value="teknologi">Teknologi</option>
            <option value="seni">Seni</option>
          </select>
        </div>

        <div className="mb-4">
          <div className="mb-2 block text-sm font-bold text-gray-700">
            Deskripsi
          </div>
          <textarea
            ref={deskripsiRef}  // Menambahkan ref untuk auto-focus
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={values.deskripsi}
            onChange={(e) => handleInputChange('deskripsi', e.target.value)}
            placeholder="Masukkan deskripsi"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block text-sm font-bold text-gray-700">
            Link Sumber
          </div>
          <input
            type="url"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={values.link_sumber}
            onChange={(e) => handleInputChange('link_sumber', e.target.value)}
            placeholder="Masukkan link sumber"
          />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};
