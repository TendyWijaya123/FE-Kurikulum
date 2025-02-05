import { useState, useEffect, useContext } from "react";
import { getPermission, upsertPermission, deletePermission, deletePermissions } from "../../service/permission";
import { AuthContext } from "../../context/AuthProvider";
import { message } from 'antd';

export const  usePermissionData = () => {
    const [permission, setPermission] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [saving, setSaving] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchPermission = async () => {
            setLoading(true);
            try {
                const data = await getPermission();
                setPermission(data);
            } catch (error) {
                console.error("Error fetching permission:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPermission();
    }, [user?.prodiId]);

    useEffect(() => {
        if (permission.length > 0) {
            setDataSource(
                permission.map((item, index) => ({
                    key: 'permission' + index + 1,
                    _id: item.id,
                    name: item.name
                }))
            );
            console.log(dataSource);
        }else {
            setDataSource([]);
        }
    }, [permission]);

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

    // Add row
    const handleAddRow = () => {
        // Simpan kondisi sebelum perubahan untuk undo
        saveToUndoStack([...dataSource]);

        const existingKeys = dataSource.map((item) => parseInt(item.key.replace('permission', ''))).sort((a, b) => a - b);
        let newKeyNumber = 1;

        for (let i = 0; i < existingKeys.length; i++) {
            if (existingKeys[i] !== newKeyNumber) {
                break;
            }
            newKeyNumber++;
        }
    
        // Tambahkan baris baru
        const newRow = {
            key: 'permission' + newKeyNumber, // Akan diperbarui nanti
            _id: null,
            name: '', // Akan diperbarui nanti
        };
    
        setDataSource([...dataSource, newRow]);
    };
    

    // Delete row
    const handleDeleteRow = async (key) => {
        saveToUndoStack([...dataSource]);

        const deleteData = dataSource.find((item) => item.key === key);

        if (deleteData?._id !== null) {
            try {
                await deletePermission(deleteData._id);
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
            await upsertPermission(dataSource);
            message.success('Data berhasil disimpan!');
        } catch (error) {
            message.error('Gagal menyimpan data!');
            console.error("Error saving permission:", error);
        } finally {
            setSaving(false);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
    };

    const handleDeletePermissions = async () => {
        setLoading(true);
        try {
            // Pisahkan data yang akan dihapus dan yang akan disimpan
            const { toDelete, toKeep } = dataSource.reduce(
                (acc, item) => {
                    if (selectedRowKeys.includes(item.key)) {
                        acc.toDelete.push(item);
                    } else {
                        acc.toKeep.push(item);
                    }
                    return acc;
                },
                { toDelete: [], toKeep: [] }
            );
            // Perbarui ulang key dan code agar tetap terurut
            await deletePermissions(toDelete);
            message.success('Data berhasil dihapus!');

            setDataSource(toKeep);
            setSelectedRowKeys([]);
        } catch (error) {
            message.error('Gagal menghapus data!');
            console.error("Error hapus permission:", error);
        } finally {
            setLoading(false);
        }
    };
         

    return {
        permission,
        loading,
        dataSource,
        saving,
        undoStack,
        rowSelection,
        selectedRowKeys,
        handleUndo,
        handleSave,
        handleAddRow,
        handleDeleteRow,
        handleSaveData,
        handleDeletePermissions,
    };
};
