import { useState, useEffect, useContext } from 'react';
import { getPermissionRole, updatePermissionRole } from '../../service/permissionRole';
import { message } from 'antd';
import { AuthContext } from '../../context/AuthProvider';

export const usePermissionRoleData = () => {
    const { user } = useContext(AuthContext);
    const [matrix, setMatrix] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [role, setRole] = useState([]);
    const [permission, setPermission] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
      const fetchPermissionRole = async () => {
        setLoading(true);
        try {
            const data = await getPermissionRole();

            setRole(data.roles);
            setPermission(data.permissions);
            setMatrix(data.matrix);
        } catch (error) {
            console.error("Error fetching dataRole or dataPermission:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchPermissionRole();

    }, [user?.prodiId]);

    useEffect(() => {
        if (role.length > 0 || permission.length > 0) {
            setDataSource(
                role.map((roleItem, rowIndex) => {
                    const rowData = {
                        key: rowIndex + 1,
                        rowHeader: roleItem.name,
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
    }, [role, permission, matrix]);

    const handleCheckboxChange = (rowIndex, colIndex, checked) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[rowIndex][colIndex] = checked;

        // Tambahkan perubahan ke daftar updates
        setUpdates(prevUpdates => [
            ...prevUpdates,
            {
                role_id: role[rowIndex].id, // ID CPL
                permission_id: permission[colIndex].id, // ID IEA
                has_relation: checked,    // True/False
            }
        ]);

        setMatrix(updatedMatrix);
    };

    const handleUpdateMatrix = async () => {
      setUpdating(true);

        const dataToSend = {
            updates: updates,
        };

        try {
            const response = await updatePermissionRole(dataToSend);
            message.success("Update successful");
        } catch (error) {
            message.error("Error updating matrix" );
        }
      setUpdating(false);

    };

    return {
        updating,
        dataSource,
        loading,
        permission,
        matrix,
        updates,
        handleCheckboxChange,
        handleUpdateMatrix,
    };
};
