import { useState, useEffect } from 'react';
import { getProfile, updatePassword } from '../service/api';
import { message } from 'antd';

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [passwordFormVisible, setPasswordFormVisible] = useState(false);
    const [passwordUpdateStatus, setPasswordUpdateStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await getProfile();
            setProfile(response.user);
            setError(null);
        } catch (err) {
            setError('Gagal mengambil data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (values) => {
        setPasswordUpdateStatus({
            loading: true,
            success: false,
            error: null
        });

        try {
            await updatePassword(values);
            setPasswordUpdateStatus({
                loading: false,
                success: true,
                error: null
            });
            
            message.success('Berhasil mengubah password ');
            
            setTimeout(() => {
                setPasswordFormVisible(false);
                setPasswordUpdateStatus(prev => ({ ...prev, success: false }));
            }, 1500);
            
        } catch (err) {
            console.error("Password update error:", err.response?.data);
            
            if (err.response?.data?.errors) {
                const errorMessages = Object.values(err.response.data.errors)
                    .flat()
                    .join('. ');
                    
                setPasswordUpdateStatus({
                    loading: false,
                    success: false,
                    error: errorMessages
                });
            } else {
                setPasswordUpdateStatus({
                    loading: false,
                    success: false,
                    error: err.response?.data?.error || 'Gagal mengubah password'
                });
            }
        }
    };

    return {
        profile,
        loading,
        error,
        passwordFormVisible,
        setPasswordFormVisible,
        handlePasswordSubmit,
        passwordUpdateStatus
    };
};

export default useProfile;