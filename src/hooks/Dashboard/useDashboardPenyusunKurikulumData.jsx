import {message, Button} from 'antd'; 
import { useEffect, useContext } from "react";
import { fetchNotifikasi, changeStatus } from "../../service/Dashboard/Dashboard";
import { AppDataContext } from "../../context/AppDataProvider";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDashboardPenyusunKurikulumData = () => {
    const [notifikasi, setNotifikasi] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const { currendKurikulum, loading} = useContext(AppDataContext);
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [activePieIndex, setActivePieIndex] = useState(null);

    //-------------------------------------------Notifikasi----------------------------------------------//

    const fetchDataNotifikasi = async () => {
        try {
            const data = await fetchNotifikasi();
            setNotifikasi(data);
        }catch(error){
            message.error(`${error})`);
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

    const openModal = (notification) => {
      setSelectedNotification(notification);
      setModalVisible(true);
      if (notification.status === "unread") {
        markAsRead(notification.id);
      }
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedNotification(null);
    };

    const visitPage = () => {
      if (selectedNotification) {
        navigate('/cpl-ppm-vm');
      }
    }

    //--------------------------------------------------------Chart and Table --------------------------------------//

    const dataProgres = currendKurikulum?.data;
    const statusCounter = {
      Belum: 0,
      Progres: 0,
      Selesai: 0,
    };

    const excludedKeys = ['is_active', 'is_other_field']; // tambahkan jika perlu

    console.log(typeof dataProgres);
    if (typeof dataProgres === 'object') {
      Object.entries(dataProgres).forEach(([key, value]) => {
        if (key.startsWith('is_') && !excludedKeys.includes(key)) {
          const normalizedValue = String(value).toLowerCase();

          if (normalizedValue === 'belum') statusCounter.Belum += 1;
          else if (normalizedValue === 'progres') statusCounter.Progres += 1;
          else if (normalizedValue === 'selesai') statusCounter.Selesai += 1;
        }
      });
    }

    const pieData = [
      statusCounter.Belum,
      statusCounter.Progres,
      statusCounter.Selesai,
    ];
    const handlePieClick = (event, chartContext, config) => {
      const clickedIndex = config.dataPointIndex;

      if (activePieIndex === clickedIndex) {
        setStatusFilter('all');
        setActivePieIndex(null);
      } else {
        setActivePieIndex(clickedIndex);
        if (clickedIndex === 0) setStatusFilter('Belum');
        else if (clickedIndex === 1) setStatusFilter('Progres');
        else if (clickedIndex === 2) setStatusFilter('Selesai');
      }
    };

    const pieConfig = {
        chart: {
          type: 'donut',
          height: 300,
          events: {
            dataPointSelection: handlePieClick
          }
        },
        labels: ['Belum', 'Progres', 'Selesai'],
        colors: ['#f5222d', '#faad14', '#52c41a'],
        legend: {
          position: 'bottom',
          labels: {
            colors: '#000',
            useSeriesColors: false,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex];
          },
          style: {
            fontWeight: 'bold',
          },
        },
        plotOptions: {
          pie: {
            donut: {
              size: '40%',
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 280
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

    const dataKurikulum = [
      { type: 'is_sksu', kategori: 'Analisis Konsideran', link: '/analisis-konsideran/sksu' },
      { type: 'is_bk', kategori: 'Analisis Konsideran', link: '/analisis-konsideran/bench-kurikulums' },
      { type: 'is_cpl_ppm_vm', kategori: 'Model dan Design', link: '/cpl-ppm-vm' },
      { type: 'is_ipteks', kategori: 'Analisis Konsideran', link: '/analisis-konsideran/ipteks' },
      { type: 'is_jejaring_mata_kuliah', kategori: 'Konstruksi dan Pra Uji', link: '/jejaring-matakuliah' },
      { type: 'is_mata_kuliah', kategori: 'Konstruksi dan Pra Uji', link: '/mata-kuliah' },
      { type: 'is_materi_pembelajaran', kategori: 'Konstruksi dan Pra Uji', link: '/mp' },
      { type: 'is_matriks_cpl_iea', kategori: 'Model dan Design', link: '/matriks-cpl-iea' },
      { type: 'is_matriks_cpl_mk', kategori: 'Model dan Design', link: '/matrix-cpl-mk' },
      { type: 'is_matriks_cpl_p', kategori: 'Model dan Design', link: '/matrix-cpl-p' },
      { type: 'is_matriks_cpl_ppm', kategori: 'Model dan Design', link: '/matrix-cpl-ppm' },
      { type: 'is_matriks_p_mp', kategori: 'Model dan Design', link: '/matriks-p-mp' },
      { type: 'is_matriks_p_mp_mk', kategori: 'Model dan Design', link: '/matriks-p-mp-mk' },
      { type: 'is_pengatahuan', kategori: 'Konstruksi dan Pra Uji', link: '/pengetahuan' },
      { type: 'is_perancangan_cpl', kategori: 'Analisis Konsideran', link: '/analisis-konsideran/kkni' },
      { type: 'is_peta_kompetensi', kategori: 'Konstruksi dan Pra Uji', link: '/peta-kompetensi' },
      { type: 'is_vmt', kategori: 'Model dan Design', link: '/vmt' },
    ];

    const statusMapping = {
      'belum': 'Belum',
      'progres': 'Progres',
      'selesai': 'Selesai'
    };

    const safeDataProgres = dataProgres || {};
    const safeDataKurikulum = Array.isArray(dataKurikulum) ? dataKurikulum : [];

    const tableData = Object.entries(safeDataProgres)
      .filter(([key]) => key.startsWith('is_') && !excludedKeys.includes(key))
      .map(([key, value], index) => {
        const meta = safeDataKurikulum.find(item => item.type === key);
        return {
          key: index,
          aspek: key.replace('is_', '').replace(/_/g, ' ').toUpperCase(),
          status: statusMapping[String(value).toLowerCase()] || 'Unknown',
          kategori: meta?.kategori || 'Tidak diketahui',
          link: meta?.link || '#'
        };
      })
      .filter(item => statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase());

    const uniqueCategories = [...new Set(safeDataKurikulum.map(item => item.kategori))];

    const columns = [
      {
        title: 'Sub Tahapan',
        dataIndex: 'aspek',
        key: 'aspek',
        sorter: (a, b) => a.aspek.localeCompare(b.aspek),
        render: text => (
          <div style={{ height: 20, lineHeight: '20px' }}>
            {text}
          </div>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'Belum', value: 'Belum' },
          { text: 'Progres', value: 'Progres' },
          { text: 'Selesai', value: 'Selesai' },
        ],
        onFilter: (value, record) => record.status === value,
        render: (text) => {
          let color = '#ccc';
          if (text === 'Belum') color = '#f5222d';
          else if (text === 'Progres') color = '#faad14';
          else if (text === 'Selesai') color = '#52c41a';
          return <span style={{ color, fontWeight: 'bold', height: 40, lineHeight: '20px' }}>{text}</span>;
        }
      },
      {
        title: 'Tahapan',
        dataIndex: 'kategori',
        key: 'kategori',
        filters: uniqueCategories.map(k => ({ text: k, value: k })),
        onFilter: (value, record) => record.kategori === value,
        render: text => (
          <div style={{ height: 20, lineHeight: '20px' }}>
            {text}
          </div>
        )
      },
      {
        title: 'Navigasi',
        dataIndex: 'link',
        key: 'link',
        render: (link) => (
          <Button style={{ height: 20, lineHeight: '20px'}} type="link" onClick={() => navigate(link)}>
            Buka
          </Button>
        ),
      }
    ];

    useEffect(() => {
        fetchDataNotifikasi();
    }, []);

    return {
        notifikasi,
        selectedIds,
        currendKurikulum,
        loading,
        modalVisible,
        tableData,
        pieConfig,
        columns,
        statusFilter,
        selectedNotification,
        pieData,
        navigate,
        setModalVisible,
        setNotifikasi,
        markAsRead,
        markAllAsRead,
        handleDelete,
        handleDeleteAll,
        handleSelect,
        openModal,
        closeModal,
        visitPage,
        setStatusFilter
    };
}