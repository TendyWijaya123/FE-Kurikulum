import { useState, useEffect, useContext } from "react";
import { getDosenHasMatkul, upsertDosenHasMatkul } from "../../service/Dosen/dosenHasMatkul";
import { AuthContext } from "../../context/AuthProvider";
import { message } from 'antd';

export const  useDosenHasMatkuluData = () => {
    const [dosenDropdown, setDosenDropdown] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [saving, setSaving] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchDosenHasMatkul = async () => {
            setLoading(true);
            try {
                const data = await getDosenHasMatkul(user?.prodiId);
                // Format ulang data agar setiap mata kuliah memiliki array dosen
                setDosenDropdown(data.dosens);
                const formattedData = data.mata_kuliahs.map((matkul) => ({
                    key: `matkul${matkul.id}`,
                    mata_kuliah_id : matkul.id,
                    kode: matkul.kode,
                    nama: matkul.nama,
                    dosen: matkul.dosens.map((dosen) => dosen.nama),
                }));
                setDataSource(formattedData);
            } catch (error) {
                console.error("Error fetching dosenHasMatkul:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDosenHasMatkul();
    }, [user?.prodiId]);

    // Save undo state
    const saveToUndoStack = (data) => {
        setUndoStack((prevStack) => [...prevStack, data]);
    };

    // Handle Undo
    const handleUndo = () => {
        if (undoStack.length > 0) {
            const previousState = undoStack[undoStack.length - 1];
            setUndoStack(undoStack.slice(0, -1));
            setDataSource(previousState);
        }
    };

    // Handle save
    const handleSave = (row) => {
        saveToUndoStack([...dataSource]);
        const newData = [...dataSource];
        const index = newData.findIndex((item) => item.key === row.key);
        if (index > -1) {
            newData[index] = { ...newData[index], ...row };
            setDataSource(newData);
        }
    };
    

    // Delete row
    const handleDeleteRow = async (key) => {
        saveToUndoStack([...dataSource]);

        const deleteData = dataSource.find((item) => item.key === key);

        if (deleteData?._id !== null) {
            try {
                await c(deleteData._id);
            } catch (error) {
                console.error("Error deleting delete:", error);
                return;
            }
        }

        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    
    

    // Save data to server
    const handleSaveData = async () => {
        setSaving(true);
        try {
            const formattedData = dataSource
                .filter((item) => Array.isArray(item.dosen_id) && item.dosen_id.length > 0) // Filter hanya yang dosen_id tidak undefined atau kosong
                .map((item) => ({
                    mata_kuliah_id: item.mata_kuliah_id,
                    dosen_id: item.dosen_id,
                }));
    
            console.log("Data yang dikirim:", formattedData);
    
            if (formattedData.length === 0) {
                message.warning("Tidak ada data yang valid untuk disimpan.");
                return;
            }
    
            await upsertDosenHasMatkul(formattedData);
            message.success("Data berhasil disimpan!");
        } catch (error) {
            message.error("Gagal menyimpan data!");
            console.error("Error saving data:", error);
        } finally {
            setSaving(false);
        }
    };
    

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
    };

    return {
        dosenDropdown,
        loading,
        dataSource,
        saving,
        undoStack,
        rowSelection,
        selectedRowKeys,
        handleUndo,
        handleSave,
        handleDeleteRow,
        handleSaveData,
        // handleDeleteDosens,
    };
};
