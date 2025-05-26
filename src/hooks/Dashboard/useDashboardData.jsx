import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { message } from "antd";
import {
  getDataCurriculum,
  prosesCurriculumData,
  progresGetData,
  sendNotification,
} from "../../service/Dashboard/Dashboard";
import { AppDataContext } from "../../context/AppDataProvider";

export const useDashboardData = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jurusans, setJurusans] = useState([]);
  const [prodis, setProdis] = useState([]);
  const [jurusanId, setJurusanId] = useState(null);
  const [selectedProdi, setSelectedProdi] = useState(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [filteredProdi, setFilteredProdi] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const intervalRef = useRef(null);

  const { jurusanDropdown, prodiDropdown } = useContext(AppDataContext);

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const fetchCurriculumData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDataCurriculum();
      setCurriculumData(Object.keys(data || {}).length > 0 ? data : []);
    } catch (error) {
      console.error("Error fetching curriculum data:", error);
      setCurriculumData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProgress = useCallback(async () => {
    try {
      const result = await progresGetData();
      setProgress(result?.progress || 0);
    } catch (error) {
      console.error("Error fetching progress:", error);
      setProgress(0);
    }
  }, []);

  const monitorProgress = useCallback(() => {
    clearExistingInterval();

    intervalRef.current = setInterval(async () => {
      try {
        const progressData = await progresGetData();
        const currentProgress = progressData?.progress || 0;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearExistingInterval();
          await fetchCurriculumData();
          setIsProcessing(false);
          setProgress(0);
          message.success("Dashboard telah diperbarui.");
        }
      } catch (error) {
        console.error("Error monitoring progress:", error);
        clearExistingInterval();
        setIsProcessing(false);
        message.error("Gagal memantau progres pemrosesan.");
      }
    }, 1000);
  }, [fetchCurriculumData]);

  const startCurriculumProcessing = useCallback(async () => {
    if (intervalRef.current) {
      message.warning("Proses sedang berjalan.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      await prosesCurriculumData();
      monitorProgress();
    } catch (error) {
      console.error("Error starting curriculum processing:", error);
      setIsProcessing(false);
      message.error("Gagal memulai pemrosesan data.");
    }
  }, [monitorProgress]);

  const handleJurusanChange = (value) => {
    setJurusanId(value);
    setSelectedProdi(null);
  };

  const handleRefresh = async () => {
    await startCurriculumProcessing();
  };

  const handleSendNotification = async (data) => {
    try {
      await sendNotification(data);
      message.success("Pemberitahuan telah dikirim.");
    } catch (error) {
      console.error("Error sending notification:", error);
      message.error("Gagal mengirim pemberitahuan.");
    }
  };

  useEffect(() => {
    if (Array.isArray(jurusanDropdown?.data)) {
      setJurusans(jurusanDropdown.data);
    }
    if (Array.isArray(prodiDropdown)) {
      setProdis(prodiDropdown);
    }
  }, [jurusanDropdown, prodiDropdown]);

  useEffect(() => {
    setFilteredProdi(
      jurusanId ? prodis.filter((p) => p.jurusan_id === jurusanId) : prodis
    );
  }, [jurusanId, prodis]);

  useEffect(() => {
    fetchCurriculumData();
    fetchProgress();
  }, [fetchCurriculumData, fetchProgress]);

  useEffect(() => {
    return () => {
      clearExistingInterval();
    };
  }, []);

  return {
    loading,
    progress,
    curriculumData,
    filteredProdi,
    jurusans,
    prodis,
    jurusanId,
    isProcessing,
    selectedProdi,
    setJurusanId,
    handleJurusanChange,
    handleRefresh,
    handleSendNotification,
  };
};
