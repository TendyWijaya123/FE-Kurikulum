import { useState, useEffect, useContext } from "react";
import {
	getMatrixPengetahuanMp,
	updateMatrixPengetahuanMp,
} from "../service/ModelKonstruksi/Matrix/MatrixPengetahuanMp";
import { message } from "antd";
import { AuthContext } from "../context/AuthProvider";
import { getProdiDropdown } from "../service/api";
import { ProdiContext } from "../context/ProdiProvider";

export const useMatriksPengetahuanMpData = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const { user } = useContext(AuthContext);
	const [matrix, setMatrix] = useState([]);
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [pengetahuan, setPengetahuan] = useState([]);
	const [mp, setMp] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [updates, setUpdates] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);

	useEffect(() => {
		const fetchMatriksPengetahuanMp = async (prodiId = null) => {
			setLoading(true);
			try {
				const data = await getMatrixPengetahuanMp(prodiId);

				setPengetahuan(data.pengetahuans);
				setMp(data.mps);
				setMatrix(data.matrix);
			} catch (error) {
				console.error(
					"Error fetching data pengetahuan or data Materi Pembelajaran:",
					error
				);
			} finally {
				setLoading(false);
			}
		};

		fetchMatriksPengetahuanMp(selectedProdiId);
	}, [selectedProdiId]);

	useEffect(() => {
		if (mp.length > 0 || pengetahuan.length > 0) {
			setDataSource(
				mp.map((mpItem, rowIndex) => {
					const rowData = {
						key: rowIndex + 1,
						kode: mpItem.code,
						deskripsi: mpItem.description,
					};
					matrix[rowIndex]?.forEach((value, colIndex) => {
						rowData[`col${colIndex + 1}`] = value;
					});
					return rowData;
				})
			);
		} else {
			setDataSource([]);
		}
	}, [pengetahuan, mp, matrix]);

	const handleProdiChange = async (value) => {
		setSelectedProdi(value);
		setLoading(true);
		try {
			const data = await getMatrixPengetahuanMp(value);
			setPengetahuan(data.pengetahuans);
			setMp(data.mps);
			setMatrix(data.matrix);
		} catch (error) {
			console.error("Error fetching matriks for selected prodi:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCheckboxChange = (rowIndex, colIndex, checked) => {
		const updatedMatrix = [...matrix];
		updatedMatrix[rowIndex][colIndex] = checked;

		// Tambahkan perubahan ke daftar updates
		setUpdates((prevUpdates) => [
			...prevUpdates,
			{
				mp_id: mp[rowIndex].id,
				p_id: pengetahuan[colIndex].id,
				has_relation: checked,
			},
		]);

		setMatrix(updatedMatrix);
	};

	const handleUpdateMatrix = async () => {
		setUpdating(true);
		if (!user?.prodiId) {
			console.error("Prodi ID is missing!");
			return;
		}

		const dataToSend = {
			prodiId: user.prodiId,
			updates: updates,
		};

		try {
			const response = await updateMatrixPengetahuanMp(dataToSend);
			message.success("Update successful");
		} catch (error) {
			message.error("Error updating matrix");
		}
		setUpdating(false);
	};

	return {
		selectedProdi,
		prodiDropdown,
		updating,
		dataSource,
		loading,
		pengetahuan,
		mp,
		matrix,
		updates,
		handleCheckboxChange,
		handleUpdateMatrix,
		handleProdiChange,
	};
};
