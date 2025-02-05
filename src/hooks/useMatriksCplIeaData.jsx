import { useState, useEffect, useContext } from 'react';
import { getMatrixCplIea, updateMatrixCplIea } from '../service/ModelKonstruksi/Matrix/MatrixCplIeaService';
import { message } from 'antd';
import { AuthContext } from '../context/AuthProvider';
import { getProdiDropdown } from '../service/api';

export const useMatriksCplIeaData = () => {
    const { user } = useContext(AuthContext);
    const [matrix, setMatrix] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [iea, setIea] = useState([]);
    const [cpl, setCpl] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [prodiDropdown, setProdiDropdown] = useState([]);
    const [selectedProdi, setSelectedProdi] = useState(null);

    useEffect(() => {
      const fetchMatriksCplIea = async () => {
        setLoading(true);
        try {
            if (user?.prodiId) {
                const data = await getMatrixCplIea(user?.prodiId);

                setIea(data.ieas);
                setCpl(data.cpls);
                console.log(data.cpls);
                setMatrix(data.matrix);
            }else {
              const prodis = await getProdiDropdown();
              setProdiDropdown(prodis);
            }
        } catch (error) {
            console.error("Error fetching dataIea or dataCpl:", error);
        } finally {
            setLoading(false);
        }
    };

      fetchMatriksCplIea();

    }, [user?.prodiId]);

    useEffect(() => {
        if (cpl.length > 0 || iea.length > 0) {
            setDataSource(
                cpl.map((cplItem, rowIndex) => {
                    const rowData = {
                        key: rowIndex + 1,
                        rowHeader: cplItem.kode, // Gunakan kode CPL sebagai header vertikal
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
    }, [cpl, iea, matrix]);

    const handleProdiChange = async (value) => {
            setSelectedProdi(value);
            setLoading(true);
            try {
                const data = await getMatrixCplIea(value); // Ambil data berdasarkan prodiId
                setIea(data.ieas);
                setCpl(data.cpls);
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
        setUpdates(prevUpdates => [
            ...prevUpdates,
            {
                cpl_id: cpl[rowIndex].id, // ID CPL
                iea_id: iea[colIndex].id, // ID IEA
                has_relation: checked,    // True/False
            }
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
            const response = await updateMatrixCplIea(dataToSend);
            message.success("Update successful");
        } catch (error) {
            message.error("Error updating matrix" );
        }
      setUpdating(false);

    };

    return {
        selectedProdi,
        prodiDropdown,
        updating,
        dataSource,
        loading,
        iea,
        cpl,
        matrix,
        updates,
        handleCheckboxChange,
        handleUpdateMatrix,
        handleProdiChange
    };
};
