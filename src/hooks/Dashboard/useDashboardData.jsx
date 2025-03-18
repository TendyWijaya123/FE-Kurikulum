import { useState, useEffect, useRef } from "react";
import { progresGetData, getDataCurriculum, fetchCurriculumData, fetchJurusan, fetchProdi } from "../../service/Dashboard/Dashboard";
import { message } from 'antd';

export const useDashboardData = () => {
    const [loading, setLoading] = useState(false);
    const [jurusans, setJurusans] = useState([]);
    const [prodis, setProdis] = useState([]);
    const [jurusanId, setJurusanId] = useState(null);
    const [selectedProdi, setSelectedProdi] = useState(null);
    const [curriculumData, setCurriculumData] = useState(null);
    const [filteredProdi, setFilteredProdi] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const pollingInterval = useRef(null);

    const fetchDropdownJurusanProdi = async () => {
        setLoading(true);
        try {
            const [jurusanData, prodiData] = await Promise.all([fetchJurusan(), fetchProdi()]);
            setJurusans(jurusanData);
            setProdis(prodiData);
        } catch (error) {
            console.error("Error fetching jurusans & prodis:", error);
            setJurusans([]);
            setProdis([]);
        } finally {
            setLoading(false);
        }
    };

    const checkProgress = async () => {
        try {
            const data = await progresGetData();
            console.log("Progress:", data.progress);
            setProgress(data.progress);

            if (data.progress >= 100) {
                setProgress(100);
                setIsProcessing(false);
                clearInterval(pollingInterval.current);
                pollingInterval.current = null;
            }
        } catch (error) {
            console.error("Error fetching progress:", error);
        }
    };

    const startCurriculumProcessing = async () => {
        try {
            setLoading(true);
            setIsProcessing(true);
            setProgress(0);
            await fetchCurriculumData();

            startPolling();
        } catch (error) {
            console.error("Error starting curriculum processing:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProcessedCurriculumData = async () => {
        try {
            if(!curriculumData){
                setLoading(true);
            }
            const data = await getDataCurriculum();
            console.log("Fetched curriculum data:", data);
            setCurriculumData(data && Object.keys(data).length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching curriculum data:", error);
            setCurriculumData([]);
        } finally {
            setLoading(false);
        }
    };

    const startPolling = () => {
        if (!pollingInterval.current) {
            pollingInterval.current = setInterval(async () => {
                console.log('Polling berjalan...');
                await checkProgress();
                await fetchProcessedCurriculumData();
            }, 1000);
        }
    };

    useEffect(() => {
        return () => {
            if (pollingInterval.current) {
                clearInterval(pollingInterval.current);
                pollingInterval.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (jurusanId) {
            setFilteredProdi(prodis.filter(prodi => prodi.jurusan_id === jurusanId));
        } else {
            setFilteredProdi(prodis);
        }
    }, [jurusanId, prodis]);

    useEffect(() => {
        const initializeData = async () => {
            await fetchDropdownJurusanProdi();
            await fetchProcessedCurriculumData();
        };

        initializeData();
    }, []);

    useEffect(() => {
        if (curriculumData !== null && curriculumData.length === 0) {
            console.log("Data kurikulum kosong, memulai pemrosesan...");
            startCurriculumProcessing();
        }
    }, [curriculumData]);

    const handleJurusanChange = (value) => {
        setJurusanId(value);
        setSelectedProdi(null);
    };

    return {
        loading,
        curriculumData,
        isProcessing,
        progress,
        filteredProdi,
        jurusans,
        prodis,
        jurusanId,
        selectedProdi,
        setJurusanId,
        handleJurusanChange,
    };
};
