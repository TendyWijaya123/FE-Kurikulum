import React from "react";
import useMatrixCplMk from "../../../hooks/ModelKonstruksi/useMatrixCplMk";
import { Button, Spin } from "antd";
import VisibleMenu from "../../Menu/VisibleMenu";
import { SaveOutlined } from "@ant-design/icons";

const MatrixCplMkTable = () => {
    const {
        cpls,
        mataKuliahs,
        matrixData,
        loading,
        error,
        updateMatrix,
        handleCheckboxChange,
    } = useMatrixCplMk();

    if (error) return <p>Error: {error.message}</p>;

    const handleCategoryChange = (cplId, mkId, newKategori) => {
        const kategori = Array.isArray(newKategori) ? newKategori : [];

        handleCheckboxChange(cplId, mkId, kategori);
    };

    return (
        <div className="p-4 bg-white">
            <div style={{ marginBottom: "10px", display: "flex", gap: "5px" }}>
                <VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={updateMatrix}
                        style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}>
                        Simpan Perubahan
                    </Button>
                </VisibleMenu>
            </div>

            <div className="mb-2 text-sm text-gray-600 space-x-4 flex flex-wrap justify-center">
                <span>
                    <span className="font-semibold text-blue-600">I</span>: Introduce
                </span>
                <span>
                    <span className="font-semibold text-green-600">R</span>: Reinforced
                </span>
                <span>
                    <span className="font-semibold text-yellow-600">M</span>: Mastery
                </span>
                <span>
                    <span className="font-semibold text-red-600">A</span>: Assessment
                </span>
            </div>

            {loading ? (
                <Spin />
            ) : (
                <div className="overflow-x-auto overflow-y-auto h-screen">
                    <table className="min-w-full table-fixed border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th
                                    rowSpan="2"
                                    className="px-4 py-2 text-left font-semibold text-gray-700 sticky top-0 left-0 bg-gray-100 border border-gray-200 z-[30]">
                                    Mata Kuliah
                                </th>
                                <th
                                    colSpan={cpls.length}
                                    className="px-4 py-2 text-center font-semibold text-gray-700 sticky top-0 bg-gray-100 border border-gray-200 z-[20]">
                                    CPL
                                </th>
                            </tr>
                            <tr>
                                {cpls.map((cpl) => (
                                    <th
                                        key={cpl.id}
                                        title={cpl.keterangan}
                                        className="px-4 py-2 text-left font-semibold text-gray-700 sticky top-[40px] bg-gray-100 border border-gray-200 z-[20]">
                                        {cpl.kode}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {mataKuliahs.map((mataKuliah) => (
                                <tr key={mataKuliah.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-gray-700 sticky left-0 bg-white border border-gray-200 z-10">
                                        {mataKuliah.nama}
                                    </td>
                                    {cpls.map((cpl) => {
                                        // Mendapatkan kategori yang dipilih untuk MK pada CPL tertentu
                                        const selectedKategori =
                                            matrixData
                                                .find((item) => item.cpl_id === cpl.id)
                                                ?.mk_ids.find((mk) => mk.mk_id === mataKuliah.id)
                                                ?.kategori || [];

                                        return (
                                            <td
                                                key={`${cpl.id}-${mataKuliah.id}`}
                                                className="px-4 py-2 border border-gray-200">
                                                <div className="flex  gap-1 w-full">
                                                    {["I", "R", "M", "A"].map((kategori) => {
                                                        const isSelected =
                                                            selectedKategori.includes(kategori);

                                                        const warna = {
                                                            I: "bg-blue-100 text-blue-800",
                                                            R: "bg-green-100 text-green-800",
                                                            M: "bg-yellow-100 text-yellow-800",
                                                            A: "bg-red-100 text-red-800",
                                                        }[kategori];

                                                        return (
                                                            <button
                                                                key={kategori}
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated = isSelected
                                                                        ? selectedKategori.filter(
                                                                                (k) => k !== kategori
                                                                          )
                                                                        : [...selectedKategori, kategori];
                                                                    handleCategoryChange(
                                                                        cpl.id,
                                                                        mataKuliah.id,
                                                                        updated
                                                                    );
                                                                }}
                                                                className={`text-xs px-2 py-1 rounded border flex-1 min-w-[40px] text-center ${
                                                                    isSelected
                                                                        ? warna
                                                                        : "bg-gray-100 text-gray-800"
                                                                } hover:opacity-80 transition`}>
                                                                {kategori}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MatrixCplMkTable;
