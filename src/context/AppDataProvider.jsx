import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrendKurikulum,
  tandaiSelesai,
  getProdiDropdown,
  getJurusanDropdown,
} from "../service/api";
import { message } from "antd";
import { AuthContext } from "./AuthProvider";

export const AppDataContext = createContext();

const AppDataProvider = ({ children }) => {
  const [currendKurikulum, setCurrendKurikulum] = useState(
    JSON.parse(localStorage.getItem("currendKurikulum")) || null
  );
  const [prodiDropdown, setProdiDropdown] = useState(
    JSON.parse(localStorage.getItem("prodiDropdown")) || []
  );
  const [jurusanDropdown, setJurusanDropdown] = useState(
    JSON.parse(localStorage.getItem("jurusanDropdown")) || []
  );

  const initialSelectedProdiId = (() => {
    const storedId = localStorage.getItem("selectedProdiId");
    const parsedId = storedId ? parseInt(storedId, 10) : null;
    return isNaN(parsedId) ? null : parsedId;
  })();

  const [selectedProdiId, setSelectedProdiId] = useState(initialSelectedProdiId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currendKurikulum) fetchCurrendKurikulum();
    if (prodiDropdown.length === 0) fetchProdiDropdown();
    if (jurusanDropdown.length === 0) fetchJurusanDropdown();
  }, []);

  const fetchCurrendKurikulum = async () => {
    setLoading(true);
    try {
      const data = await getCurrendKurikulum();
      setCurrendKurikulum(data);
      localStorage.setItem("currendKurikulum", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching kurikulum:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProdiDropdown = async () => {
    try {
      const data = await getProdiDropdown();
      setProdiDropdown(data);
      localStorage.setItem("prodiDropdown", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching prodi dropdown:", error);
    }
  };

  const fetchJurusanDropdown = async () => {
    try {
      const data = await getJurusanDropdown();
      setJurusanDropdown(data);
      localStorage.setItem("jurusanDropdown", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching jurusan dropdown:", error);
    }
  };

  const handleChangeSelectedProdiId = (id) => {
    const newValue = id ? parseInt(id, 10) : null;
    setSelectedProdiId(newValue);
    if (newValue !== null) {
      localStorage.setItem("selectedProdiId", newValue);
    } else {
      localStorage.removeItem("selectedProdiId");
    }
  };

  const handleTandaiSelesai = async (nameStatus, status) => {
    try {
      const response = await tandaiSelesai(nameStatus, status);
      message.success("Berhasil update progres");
      fetchCurrendKurikulum(); 
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Terjadi kesalahan.";
      message.error(msg);
      return null;
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        currendKurikulum,
        fetchCurrendKurikulum,
        handleTandaiSelesai,
        prodiDropdown,
        jurusanDropdown,
        selectedProdiId,
        handleChangeSelectedProdiId,
        loading,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
