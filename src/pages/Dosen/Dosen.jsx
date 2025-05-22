import { useDosenData } from "../../hooks/Dosen/useDosenData";
import DefaultLayout from "../../layouts/DefaultLayout";
import { UndoOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Button, Tooltip, Spin, Input, Select } from "antd";
import DosenCreateModal from "./DosenCreateModal";
import DosenEditModal from "./DosenEditModal";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const Dosen = () => {
    const {
        fetchDosen,
        loading,
        dataSource,
        saving,
        rowSelection,
        selectedRowKeys,
        modalVisible,
        editModalVisible,
        setModalVisible,
        setEditModalVisible,
        handleUndo,
        handleDeleteDosens,
        prodiDropdown,
    } = useDosenData();

    const [selectedDosen, setSelectedDosen] = useState(null);
    const [filters, setFilters] = useState({
        kode: "",
        nama: "",
        prodi_id: undefined, 
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [filteredData, setFilteredData] = useState([]);

    const handleEdit = (record) => {
        setSelectedDosen({
            ...record,
            prodi: record.prodi
                ? record.prodi.split(",").map((p) => p.trim())
                : [],
        });
        setEditModalVisible(true);
    };

    const handleSearch = () => {
        const isFiltersEmpty = !filters.kode && !filters.nama && !filters.prodi_id;
        
        if (isFiltersEmpty) {
            setFilteredData([]);
            return;
        }

        const filteredData = dataSource.filter((item) => {
            const matchKode = filters.kode ? 
                item.kode.toLowerCase().includes(filters.kode.toLowerCase()) : true;
            const matchNama = filters.nama ? 
                item.nama.toLowerCase().includes(filters.nama.toLowerCase()) : true;
                
            const matchProdi = filters.prodi_id ? 
                item.prodi 
                    .split(", ") 
                    .map(p => p.trim()) 
                    .includes(
                        prodiDropdown.find(p => p.id === filters.prodi_id)?.name
                    ) : true;
            
            console.log({
                itemProdi: item.prodi,
                selectedProdiName: prodiDropdown.find(p => p.id === filters.prodi_id)?.name,
                matchProdi
            });

            return matchKode && matchNama && matchProdi;
        });

        setFilteredData(filteredData);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: 70,
            render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        { title: "Kode", dataIndex: "kode", key: "kode" },
        { title: "NIP", dataIndex: "nip", key: "nip" },
        { title: "Nama", dataIndex: "nama", key: "nama" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Jenis Kelamin", dataIndex: "jenisKelamin", key: "jenisKelamin" },
        { title: "Jurusan", dataIndex: "jurusan", key: "jurusan" },
        {
            title: "Program Studi",
            dataIndex: "prodi",
            key: "prodi",
            render: (text) => <div style={{ whiteSpace: "pre-line" }}>{text}</div>,
        },
        {
            title: "Aksi",
            key: "aksi",
            width: 100,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{
                            backgroundColor: "#faad14",
                            borderColor: "#faad14",
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <DefaultLayout title="Dosen">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-xl font-bold mb-4">Dosen</h1>

                {/* Buttons Section */}
                <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModalVisible(true)}>
                        Tambah Dosen
                    </Button>
                </div>

                {/* Filter Section */}
                <div className="mb-4 flex gap-4">
                    <Input
                        placeholder="Cari Kode Dosen"
                        value={filters.kode}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, kode: e.target.value }))
                        }
                    />
                    <Input
                        placeholder="Cari Nama Dosen"
                        value={filters.nama}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, nama: e.target.value }))
                        }
                    />
                    <Select
                        placeholder="Pilih Prodi"
                        allowClear
                        style={{ width: 200 }}
                        value={filters.prodi_id}
                        onChange={(value) =>
                            setFilters((prev) => ({ ...prev, prodi_id: value }))
                        }
                    >
                        {prodiDropdown.map((prodi) => (
                            <Select.Option key={prodi.id} value={prodi.id}>
                                {prodi.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button type="primary" onClick={handleSearch}>
                        <SearchOutlined />
                    </Button>
                </div>

                {/* Table Section */}
                <Table
                    className="overflow-x-auto"
                    dataSource={
                        filters.kode || filters.nama || filters.prodi_id !== undefined
                            ? filteredData
                            : dataSource
                    }
                    columns={columns}
                    loading={loading}
                    pagination={{
                        ...pagination,
                        total: (
                            (filters.kode || filters.nama || filters.prodi_id !== undefined)
                                ? filteredData
                                : dataSource
                        ).length,
                        showSizeChanger: false,
                        onChange: (page, pageSize) => {
                            setPagination({
                                ...pagination,
                                current: page,
                                pageSize: pageSize,
                            });
                        },
                    }}
                    bordered
                />

                <DosenCreateModal
                    visible={modalVisible}
                    onClose={() => {
                        setModalVisible(false);
                        fetchDosen();
                    }}
                />
                <DosenEditModal
                    visible={editModalVisible}
                    dosenData={selectedDosen}
                    onClose={() => {
                        setEditModalVisible(false);
                        fetchDosen();
                    }}
                />
            </div>
        </DefaultLayout>
    );
};

export default Dosen;
