import { useState, useEffect } from "react";
import {
	getMatrixCplMk,
	updateMatrixCplMk,
} from "../../service/ModelKonstruksi/Matrix/MatrixCplMkService";
import { message } from "antd";

const useMatrixCplMk = () => {
	const [cpls, setCpls] = useState([]);
	const [mataKuliahs, setMataKuliahs] = useState([]);
	const [matrixData, setMatrixData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchMatrixData = async () => {
		try {
			setLoading(true);
			const data = await getMatrixCplMk();

			setCpls(data.cpls);
			setMataKuliahs(data.mataKuliahs);

			const transformedMatrixData = data.matrix.map((entry) => ({
				cpl_id: entry.cpl.id,
				mk_ids: entry.mataKuliahs
					.filter((mk) => mk.exists)
					.map((mk) => ({
						mk_id: mk.mk_id,
						kategori: mk.kategori,
					})),
			}));

			setMatrixData(transformedMatrixData);
		} catch (err) {
			setError(err);
			message.error("Gagal Mengambil data matriks cpl mk");
		} finally {
			setLoading(false);
		}
	};

	const handleCheckboxChange = (cplId, mkId, kategori) => {
		setMatrixData((prevMatrixData) =>
			prevMatrixData.map((item) => {
				if (item.cpl_id === cplId) {
					const mkIds = item.mk_ids.some((mk) => mk.mk_id === mkId)
						? item.mk_ids.filter((mk) => mk.mk_id !== mkId)
						: [...item.mk_ids, { mk_id: mkId, kategori }];

					return { ...item, mk_ids: mkIds };
				}
				return item;
			})
		);
	};

	const updateMatrix = async () => {
		try {
			await updateMatrixCplMk({ matrix: matrixData });
			fetchMatrixData();
			message.success("Matrix berhasil di update");
		} catch (err) {
			message.error("Matrix gagal diupdate", err.message);

			setError(err);
		}
	};

	useEffect(() => {
		fetchMatrixData();
	}, []);

	return {
		cpls,
		mataKuliahs,
		matrixData,
		loading,
		error,
		updateMatrix,
		handleCheckboxChange,
	};
};

export default useMatrixCplMk;
