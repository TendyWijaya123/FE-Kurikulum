import { useState, useEffect } from "react";
import {
  getMatrixCplP,
  updateMatrixCplP,
} from "../../service/ModelKonstruksi/Matrix/MatrixCplPService";

const useMatrixCplP = () => {
  const [cpls, setCpls] = useState([]);
  const [ps, setPs] = useState([]);
  const [matrixData, setMatrixData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatrixData = async () => {
    try {
      setLoading(true);
      const data = await getMatrixCplP();

      setCpls(data.cpls);
      setPs(data.ps);

      const transformedMatrixData = data.matrix.map((entry) => ({
        cpl_id: entry.cpl.id,
        p_ids: entry.ps
          .filter((p) => p.exists)
          .map((p) => p.p_id),
      }));

      setMatrixData(transformedMatrixData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (cplId, pId) => {
    setMatrixData((prevMatrixData) =>
      prevMatrixData.map((item) => {
        if (item.cpl_id === cplId) {
          const pIds = item.p_ids.includes(pId)
            ? item.p_ids.filter((id) => id !== pId)
            : [...item.p_ids, pId];

          return { ...item, p_ids: pIds };
        }
        return item;
      })
    );
  };

  const updateMatrix = async () => {
    try {
      await updateMatrixCplP({ matrix: matrixData });
      fetchMatrixData();
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchMatrixData();
  }, []);

  return {
    cpls,
    ps,
    matrixData,
    loading,
    error,
    updateMatrix,
    handleCheckboxChange,
  };
};

export default useMatrixCplP;