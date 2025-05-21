import { useState, useEffect, useRef } from "react";
import {
	getDataCurriculum,
	fetchCurriculumData,
	fetchJurusan,
	fetchProdi,
} from "../../service/Dashboard/Dashboard";
import { message } from "antd";
import { progresGetData, sendNotification } from "../../service/Dashboard/Dashboard";

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

	const fetchDropdownJurusanProdi = async () => {
		setLoading(true);
		try {
			const [jurusanData, prodiData] = await Promise.all([
				fetchJurusan(),
				fetchProdi(),
			]);
			setJurusans(jurusanData);
			setProdis(prodiData);
		} catch (error) {
			message.error("Error fetching jurusans & prodis:", error);
			setJurusans([]);
			setProdis([]);
		} finally {
			setLoading(false);
		}
	};

	const fetchProgress = async () => {
		try {
			const progressData = await progresGetData();
			setProgress(progressData);
		} catch (error) {
			console.error("Error fetching progress:", error);
		}
	};

	const startCurriculumProcessing = async () => {
		// setLoading(true);
		setProgress(0);
		setIsProcessing(true);

		try {
			await fetchCurriculumData();

			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}

			intervalRef.current = setInterval(async () => {
				try {
					const progressData = await progresGetData();
					setProgress(progressData.progress);

					if (progressData.progress >= 100) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
						await fetchProcessedCurriculumData();
						setLoading(false);
						setIsProcessing(false); 
					}
				} catch (error) {
					console.error("Error fetching progress:", error);
					clearInterval(intervalRef.current);
					intervalRef.current = null;
					setLoading(false);
					setIsProcessing(false);
				}
			}, 1000);
		} catch (error) {
			console.error("Error starting curriculum processing:", error);
			setLoading(false);
			setIsProcessing(false);
		}
	};

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, []);

	const fetchProcessedCurriculumData = async () => {
		setLoading(true);
		try {
			const data = await getDataCurriculum();
			setCurriculumData(data && Object.keys(data).length > 0 ? data : []);
		} catch (error) {
			console.error("Error fetching curriculum data:", error);
			setCurriculumData([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (jurusanId) {
			setFilteredProdi(
				prodis.filter((prodi) => prodi.jurusan_id === jurusanId)
			);
		} else {
			setFilteredProdi(prodis);
		}
	}, [jurusanId, prodis]);

	useEffect(() => {
		const initializeData = async () => {
			await fetchDropdownJurusanProdi();
			await fetchProcessedCurriculumData();
			await fetchProgress();
		};
		initializeData();
	}, []);

	const handleJurusanChange = (value) => {
		setJurusanId(value);
		setSelectedProdi(null);
	};

	const handleRefresh = async () => {
		await startCurriculumProcessing();
	};

	const handleSendNotification = async (data) => {
		try {
			console.log(data);
			await sendNotification(data);
			message.success("Pemberitahuan telah dikirim.");
		} catch (error) {
			message.error("Error sending notification:", error);
		}
	}

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
		handleSendNotification
	};
};
