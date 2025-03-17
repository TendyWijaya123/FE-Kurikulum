import { useState, useEffect, useContext } from 'react';
import { message } from 'antd';
import { 
    getPetaKompetensi, 
    uploadPetaKompetensi, 
    deletePetaKompetensi 
} from '../service/PetaKompetensiService';
import { AuthContext } from '../context/AuthProvider';

export const usePetaKompetensi = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [petaData, setPetaData] = useState(null);
    const [imageVisible, setImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch peta kompetensi data
    const fetchPetaData = async () => {
        if (!user?.prodiId) return;
        
        setLoading(true);
        try {
            const response = await getPetaKompetensi(user.prodiId);
            if (response.success) {
                setPetaData(response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error('Gagal memuat data peta kompetensi');
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        if (user?.prodiId) {
            fetchPetaData();
        }
    }, [user?.prodiId]);

    // Upload image
    const handleUpload = async (file) => {
        if (!user?.prodiId) {
            message.error('Prodi ID tidak ditemukan');
            return;
        }
        
        setUploading(true);
        try {
            // Debugging: log user.prodiId
            console.log("Uploading with prodiId:", user.prodiId);
            
            const formData = new FormData();
            formData.append('gambar', file);
            formData.append('prodi_id', user.prodiId);
            
            // Log formData for debugging
            console.log("Form data created, attempting upload...");
            
            const response = await uploadPetaKompetensi(formData);
            console.log("Upload response:", response);
            
            if (response.success) {
                message.success('Gambar berhasil diunggah');
                fetchPetaData();
            }
        } catch (error) {
            console.error("Upload error:", error);
            
            // More detailed error message
            if (error.response && error.response.data && error.response.data.message) {
                message.error(`Gagal mengunggah gambar: ${error.response.data.message}`);
            } else {
                message.error('Gagal mengunggah gambar');
            }
        } finally {
            setUploading(false);
        }
    };

    // Delete image
    const handleDelete = async (id) => {
        setDeleting(id); // Track which item is being deleted
        try {
            const response = await deletePetaKompetensi(id);
            if (response.success) {
                message.success('Gambar berhasil dihapus');
                setPetaData(null);
            }
        } catch (error) {
            console.error("Delete error:", error);
            message.error('Gagal menghapus gambar');
        } finally {
            setDeleting(false);
        }
    };

    // Show image in modal
    const showImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setImageVisible(true);
    };

    return {
        loading,
        uploading,
        deleting,
        petaData,
        imageVisible,
        selectedImage,
        handleUpload,
        handleDelete,
        showImage,
    };
};      