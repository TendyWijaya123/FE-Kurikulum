import { useState, useEffect, useContext } from 'react';
import { getMatrixMpPMK, updateMatrixMpPMK } from '../service/ModelKonstruksi/Matrix/MatrixMpPMkService';
import { message } from 'antd';
import { AuthContext } from '../context/AuthProvider';
import { getProdiDropdown } from '../service/api';

export const useMatriksMpPMkData = () => {
    const { user } = useContext(AuthContext);
        const [matrix, setMatrix] = useState([]);
        const [loading, setLoading] = useState(false);
        const [updating, setUpdating] = useState(false);
        const [pengetahuan, setPengetahuan] = useState([]);
        const [mp, setMp] = useState([]);
        const [mks, setMk] = useState([]);
        const [dataSource, setDataSource] = useState([]);
        const [updates, setUpdates] = useState([]);
        const [prodiDropdown, setProdiDropdown] = useState([]);
        const [selectedProdi, setSelectedProdi] = useState(null);
    
        useEffect(() => {
          const fetchMatriksPengetahuanMp = async () => {
            setLoading(true);
            try {
                if (user?.prodiId) {
                    const data = await getMatrixMpPMK(user?.prodiId);
    
                    setPengetahuan(data.pengetahuans);
                    setMp(data.mps);
                    setMatrix(data.matrix);
                    setMk(data.mataKuliah);
                }else {
                  const prodis = await getProdiDropdown();
                  setProdiDropdown(prodis);
                }
            } catch (error) {
                console.error("Error fetching data pengetahuan or data Materi Pembelajaran:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMatriksPengetahuanMp();
    
        }, [user?.prodiId]);
    
        useEffect(() => {
            if (mp.length > 0 || pengetahuan.length > 0) {
                setDataSource(
                    mp.map((mpItem, rowIndex) => {
                        const rowData = {
                            key: rowIndex + 1,
                            materiPembelajaran: mpItem.description,
                            cognitifProses: mpItem.cognitif_proses,
                            knowledgeDimension: mpItem.knowledge_dimension?.length
                                ? mpItem.knowledge_dimension.map((k) => k.code).join(', ')
                                : [],
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
                const data = await getMatrixMpPMK
                (value); 
                setPengetahuan(data.pengetahuans);
                setMp(data.mps);
                setMatrix(data.matrix);
            } catch (error) {
                console.error("Error fetching matriks for selected prodi:", error);
            } finally {
                setLoading(false);
            }
        };
    
        const handleDropdownChange = (rowIndex, colIndex, selectedValue, relationId) => {
            console.log(selectedValue);
            const updatedMatrix = [...matrix];
            if (updatedMatrix[rowIndex][colIndex].enabled) {
                const selectedMataKuliah = mks.filter((mk) => selectedValue.includes(mk.id));
                updatedMatrix[rowIndex][colIndex].mata_kuliahs = selectedMataKuliah;
        
                setUpdates((prevUpdates) => {
                    const existingIndex = prevUpdates.findIndex(
                        (update) =>
                            update.mp_id === mp[rowIndex].id &&
                            update.p_id === pengetahuan[colIndex].id &&
                            update.relationMpPId === relationId
                    );
        
                    if (existingIndex !== -1) {
                        const updatedUpdates = [...prevUpdates];
                        updatedUpdates[existingIndex].selected_matkul = selectedValue;
                        return updatedUpdates;
                    } else {
                        return [
                            ...prevUpdates,
                            {
                                mp_id: mp[rowIndex].id,
                                p_id: pengetahuan[colIndex].id,
                                selected_matkul: selectedValue,
                                relationMpPId: relationId,
                            },
                        ];
                    }
                });
        
                setMatrix(updatedMatrix);
            } else {
                message.warning("Sel ini tidak dapat diubah karena relasi MP-P tidak tersedia.");
            }
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
                const response = await updateMatrixMpPMK(dataToSend);
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
            mks,
            matrix,
            updates,
            handleDropdownChange,
            handleUpdateMatrix,
            handleProdiChange
        };
};
