import { useState, useEffect } from "react";
import {
	getMatrixCplPpm,
	updateMatrixCplPpm,
} from "../../service/ModelKonstruksi/Matrix/MatrixCplPpmService";
import { message } from "antd";

const useMatrixCplPpm = () => {
	const [cpls, setCpls] = useState([]);
	const [ppms, setPpms] = useState([]);
	const [matrixData, setMatrixData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchMatrixData = async () => {
		try {
			setLoading(true);
			const data = await getMatrixCplPpm();

			setCpls(data.cpls);
			setPpms(data.ppms);

			const transformedMatrixData = data.matrix.map((entry) => ({
				cpl_id: entry.cpl.id,
				ppm_ids: entry.ppms
					.filter((ppm) => ppm.exists)
					.map((ppm) => ppm.ppm_id),
			}));

			setMatrixData(transformedMatrixData);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const handleCheckboxChange = (cplId, ppmId) => {
		setMatrixData((prevMatrixData) =>
			prevMatrixData.map((item) => {
				if (item.cpl_id === cplId) {
					const ppmIds = item.ppm_ids.includes(ppmId)
						? item.ppm_ids.filter((id) => id !== ppmId)
						: [...item.ppm_ids, ppmId];

					return { ...item, ppm_ids: ppmIds };
				}
				return item;
			})
		);
	};

	const updateMatrix = async () => {
		try {
			await updateMatrixCplPpm({ matrix: matrixData });
			fetchMatrixData();
			message.success("Matrix berhasil  diupdate");
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		fetchMatrixData();
	}, []);

	return {
		cpls,
		ppms,
		matrixData,
		loading,
		error,
		updateMatrix,
		handleCheckboxChange,
	};
};

export default useMatrixCplPpm;
