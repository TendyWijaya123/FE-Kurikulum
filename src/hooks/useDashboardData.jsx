import { useState, useEffect } from "react";
import { fetchCurriculumData, fetchJurusan, fetchProdi } from "../service/Dashboard";

export const useDashboardData = () => {
    const [loading, setLoading] = useState(false);
    const [jurusans, setJurusans] = useState([]);
    const [prodis, setProdis] = useState([]);
    const [jurusanId, setJurusanId] = useState(null);
    const [selectedProdi, setSelectedProdi] = useState(null);
    const [curriculumData, setCurriculumData] = useState(null);
    const [filteredProdi, setFilteredProdi] = useState([]);


    const fetchDropdownJurusanProdi = async () => {
        setLoading(true);
        try {
            const jurusans = await fetchJurusan();
            const prodis = await fetchProdi();
            setJurusans(jurusans);
            setProdis(prodis);
        } catch (error) {
            console.error('Error fetching jurusans:', error);
            message.error('Gagal mengambil data jurusan');
            setJurusans([]);
            setProdis([]);
        } finally {
            setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchDropdownJurusanProdi();
      }, []);

      useEffect(()=>{
            if(jurusanId){
                setFilteredProdi(prodis.filter(prodi => prodi.jurusan_id === jurusanId));
            }else {
                setFilteredProdi(prodis);
            }
        }, [jurusanId, prodis])
    
      const handleJurusanChange = (value) => {
        if(value === undefined){
            setSelectedProdi(null);
            setJurusanId(value);
        }else{
            setJurusanId(value);
        }
      };
    
      const handleProdiChange = async (value) => {
        setCurriculumData([]);
        setSelectedProdi(value);
        setLoading(true);
        try {
            const data = await fetchCurriculumData(value);
            if (data) {
                setCurriculumData(data);
            } else {
                setCurriculumData(null);
                message.error('Format data kurikulum tidak valid');
            }
        } catch (error) {
            console.error('Error fetching curriculum:', error);
            message.error('Gagal mengambil data kurikulum');
            setCurriculumData(null);
        } finally {
            setLoading(false);
        }
      };

      return {
        loading,
        curriculumData,
        filteredProdi,
        jurusans,
        jurusanId,
        selectedProdi,
        setJurusanId,
        handleJurusanChange,
        handleProdiChange,
      }
}