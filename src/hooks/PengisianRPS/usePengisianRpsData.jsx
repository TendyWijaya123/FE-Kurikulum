import { useState, useEffect, useContext } from "react";
import { getMatkulDropdown } from "../../service/PengisianRps/pengisianRps";
import { AuthContext } from "../../context/AuthProvider";
import { message } from 'antd';

export const  usePengisianRpsData = () => {
    const [matkulDropdown, setmatkulDropdown] = useState([]);
    const [matkulRps, setmatkulRps] = useState();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [saving, setSaving] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchPengisianRps = async () => {
            setLoading(true);
            try {
                const data = await getMatkulDropdown(user?.id);
                setmatkulDropdown(data);
            } catch (error) {
                console.error("Error fetching dosen:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPengisianRps();
    }, [user]);
         

    return {
        matkulDropdown
    };
};
