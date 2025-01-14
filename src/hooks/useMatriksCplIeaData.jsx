import { useState, useEffect, useContext } from 'react';
import { fetchCpls } from '../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM';
import { getIea } from '../service/iea';
import { AuthContext } from '../context/AuthProvider';

export const useMatriksCplIeaData = ()=>{
    const { user } = useContext(AuthContext);
    const [matrix, setMatrix] = useState([]);
    const [loading, setLoading] = useState(false);
    const [iea, setIea] = useState([]);
    const [cpl, setCpl] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    useEffect (() => {
        const fetchMatriksCplIea = async () => {
            setLoading(true);
            try{
                if(user?.prodiId) {
                    const dataIea = await getIea(user?.prodiId);
                    const dataCplResponse = await fetchCpls();
                    const dataCpl = dataCplResponse.data;

                    setIea(dataIea);
                    setCpl(dataCpl);

                    const initialMatrix = dataCpl.map(() =>
                        dataIea.map(() => false)
                      );
                    setMatrix(initialMatrix);
                }
            }catch(error){
                console.error("Error fetching dataIea or dataCpl:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatriksCplIea();
    }, [user?.prodiId]);

    useEffect(()=>{
        if(cpl.length > 0 || iea.length > 0) {
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
            )
        }
    }, [cpl, iea]);

    const handleCheckboxChange = (rowIndex, colIndex, checked) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[rowIndex][colIndex] = checked;
        setMatrix(updatedMatrix);
      };

    // Add a new row of checkboxes (unchecked by default)
  const addRow = () => {
    const newRow = new Array(matrix[0].length).fill(false);
    setMatrix([...matrix, newRow]);
  };

  // Add a new column of checkboxes (unchecked by default)
  const addColumn = () => {
    const updatedMatrix = matrix.map((row) => [...row, false]);
    setMatrix(updatedMatrix);
  };

    return {
        dataSource,
        loading,
        iea,
        cpl,
        matrix,
        handleCheckboxChange,
        addColumn,
        addRow
    }
}
