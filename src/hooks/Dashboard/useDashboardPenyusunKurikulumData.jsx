import {message} from 'antd'; 
import { useState, useEffect } from "react";
import { fetchNotifikasi, changeStatus } from "../../service/Dashboard/Dashboard";

export const useDashboardPenyusunKurikulumData = () => {
    const [notifikasi, setNotifikasi] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const fetchDataNotifikasi = async () => {
        try {
            const data = await fetchNotifikasi();
            setNotifikasi(data);
        }catch(error){
            message.error(`Error fetching data notifikasi   : ${error})`);
        }
    }

    const markAsRead = (id) => {
        const updatedNotifikasi = notifikasi.map((notif) => {
            if (notif.id === id) {
                notif.status = "read";
                const ids = {
                    ids : [id],
                }
                changeStatus(ids)
                    .then(() => {
                        message.success('Notifikasi telah dibaca');
                    })
                    .catch((error) => {
                        message.error(`Error marking notification as read: ${error}`);
                    });
            }
            return notif;
        });
        setNotifikasi(updatedNotifikasi);
    };
    
    const markAllAsRead = () => {
      const updatedNotifikasi = notifikasi.map((notif) => {
        notif.status = "read";
        return notif;
      });

      setNotifikasi(updatedNotifikasi);

      const ids = { ids: updatedNotifikasi.map((notif) => notif.id) };

      changeStatus({ ids })
        .then(() => {
          message.success('Semua notifikasi telah dibaca');
        })
        .catch((error) => {
          message.error(`Error marking all notifications as read: ${error}`);
        });
    };

    const handleDelete = (id) => {
        const updatedNotifikasi = notifikasi.filter((notif) => notif.id !== id);
        setNotifikasi(updatedNotifikasi); 
        message.success(`Notifikasi ${id} dihapus`);
      };
      
      const handleDeleteAll = () => {
        if (selectedIds.length === 0) {
          message.warning("Pilih notifikasi yang ingin dihapus");
          return;
        }
        // Lakukan request hapus batch ke backend di sini jika perlu
        const updatedNotifikasi = notifikasi.filter((notif) => !selectedIds.includes(notif.id));
        setNotifikasi(updatedNotifikasi);
        message.success(`Menghapus ${selectedIds.length} notifikasi`);
        setSelectedIds([]); // Reset pilihan
      };
      
      const handleSelect = (id, checked) => {
        setSelectedIds(prev => {
          if (checked) {
            return [...prev, id];
          } else {
            return prev.filter(itemId => itemId !== id);
          }
        });
      };
      

    useEffect(() => {
        fetchDataNotifikasi();
    }, []);

    return {
        notifikasi,
        selectedIds,
        markAsRead,
        markAllAsRead,
        handleDelete,
        handleDeleteAll,
        handleSelect,
    };
}