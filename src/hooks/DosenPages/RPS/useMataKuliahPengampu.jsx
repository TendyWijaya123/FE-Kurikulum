import { useEffect, useState } from "react";
import {
	getMataKuliahByDosenPengampu,
	updateDeskripsiSingkatMK,
} from "../../../service/MataKuliah/MataKuliahService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getProdiDropdownByJurusanDosen } from "../../../service/api";

const useMataKuliahPengampu = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [mataKuliahPengampuData, setMataKuliahPengampuData] = useState([]);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		total: 0,
		pageSize: 10,
	});
	const [searchParams, setSearchParams] = useState({
		nama: "",
		kode: "",
		prodi_id: null,
	});

	const navigate = useNavigate();

	const fetchMataKuliahPengampuData = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getMataKuliahByDosenPengampu({
				...searchParams,
				page: pagination.currentPage,
				perPage: pagination.pageSize,
			});
			setMataKuliahPengampuData(data.data);
			setPagination((prevPagination) => ({
				...prevPagination,
				total: data.total,
			}));
		} catch (err) {
			setError(err);
			message.error("Gagal mengambil data");
		} finally {
			setLoading(false);
		}
	};

	const fetchProdiDropdownByJurusanDosen = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getProdiDropdownByJurusanDosen();
			setProdiDropdown(data);
		} catch (err) {
			setError(err);
			message.error("Gagal mengambil data");
		} finally {
			setLoading(false);
		}
	};

	const handleNavigate = (id) => {
		navigate(`/rps/${id}`);
	};

	const handleUpdateSingkatMataKuliah = async (
		id,
		deskripsi,
		deskripsiSingkatInggris,
		namaInggris,
		MPInggris
	) => {
		await updateDeskripsiSingkatMK(
			id,
			deskripsi,
			deskripsiSingkatInggris,
			namaInggris,
			MPInggris
		);
		fetchMataKuliahPengampuData();
	};

	const handlePaginationChange = (page, pageSize) => {
		setPagination((prevPagination) => ({
			...prevPagination,
			currentPage: page,
			pageSize: pageSize,
		}));
	};

	const handleSearchChange = (name, value) => {
		setSearchParams((prevParams) => ({
			...prevParams,
			[name]: value,
		}));
	};

	useEffect(() => {
		fetchMataKuliahPengampuData();
	}, [pagination.currentPage, pagination.pageSize, searchParams]);

	useEffect(() => {
		fetchProdiDropdownByJurusanDosen();
	}, []);

	return {
		mataKuliahPengampuData,
		loading,
		error,
		pagination,
		prodiDropdown,
		handleUpdateSingkatMataKuliah,
		handleNavigate,
		handlePaginationChange,
		handleSearchChange,
	};
};

export default useMataKuliahPengampu;
