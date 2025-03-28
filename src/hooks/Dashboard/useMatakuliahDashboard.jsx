import { useState, useEffect } from "react";
import { fetchMatakuliahDashboard, fetchMatakuliahDetailDashboard } from "../../service/Dashboard/Dashboard";
import { message } from "antd";

export const useMatakuliahDashboard = () => {
    const [dataMatakuliah, setDataMatakuliah] = useState([]);
    const [dataMatakuliahDetail, setDataMatakuliahDetail] = useState([]);
    const [selectedProdi, setSelectedProdi] = useState(null);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);

    // Fetch data mata kuliah secara umum
    const fetchMatakuliah = async () => {
        setLoading(true);
        try {
            const data = await fetchMatakuliahDashboard();
            setDataMatakuliah(data);
        } catch (error) {
            message.error("Gagal mengambil data mata kuliah:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data dengan filter jurusan/prodi
    const fetchMatakuliahFilter = async (jurusanId) => {
        setLoading(true);
        try {
            const data = await fetchMatakuliahDashboard(jurusanId);
            setDataMatakuliah(data);
        } catch (error) {
            message.error("Gagal mengambil data mata kuliah dengan filter:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch detail mata kuliah per prodi
    const fetchMatakuliahDetail = async (prodiId) => {
        if (!prodiId) return;
        setLoadingDetail(true);
        try {
            const data = await fetchMatakuliahDetailDashboard(prodiId);
            setDataMatakuliahDetail(data.data[0]?.mata_kuliahs);
        } catch (error) {
            message.error("Gagal mengambil detail mata kuliah:", error);
        } finally {
            setLoadingDetail(false);
        }
    };

    useEffect(() => {
        fetchMatakuliah();
    }, []);

    return {
        dataMatakuliah,
        dataMatakuliahDetail,
        loading,
        loadingDetail,
        selectedProdi,
        selectedJurusan,
        setSelectedProdi,
        setSelectedJurusan,
        fetchMatakuliahFilter,
        fetchMatakuliahDetail
    };
};
