import React from "react";
import useMatrixCplP from "../../../hooks/ModelKonstruksi/useMatrixCplP";

const MatrixCplPTable = () => {
  const {
    cpls,
    ps,
    matrixData,
    loading,
    error,
    updateMatrix,
    handleCheckboxChange,
  } = useMatrixCplP();

  return (
    <div className="p-4 bg-white">
      <h1 className="text-xl font-semibold mb-4">Matriks CPL-P</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th
                rowSpan="2"
                className="px-4 py-2 text-left font-semibold text-gray-700 sticky left-0 bg-gray-100 border border-gray-200 z-10"
              >
                P
              </th>
              <th
                colSpan={cpls.length}
                className="px-4 py-2 text-center font-semibold text-gray-700 border border-gray-200"
              >
                CPL
              </th>
            </tr>
            <tr className="bg-gray-100">
              {cpls.map((cpl) => (
                <th
                  key={cpl.id}
                  className="px-4 py-2 text-left font-semibold text-gray-700 border border-gray-200"
                >
                  {cpl.kode}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ps.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700 sticky left-0 bg-white border border-gray-200 z-10">
                  {p.kode}
                </td>
                {cpls.map((cpl) => {
                  const isChecked = matrixData.some(
                    (item) =>
                      item.cpl_id === cpl.id && item.p_ids.includes(p.id)
                  );

                  return (
                    <td
                      key={cpl.id + p.id}
                      className="px-4 py-2 border border-gray-200"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(cpl.id, p.id)}
                        className="h-5 w-5"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          onClick={updateMatrix}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default MatrixCplPTable;