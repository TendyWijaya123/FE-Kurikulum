import { Table, Button, Modal, Form, Input, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import DefaultLayout from "../../layouts/DefaultLayout";
import useBukuReferensi from "../../hooks/BukuReferensi/useBukuReferensi";
import ImportModal from "../../components/Modal/ImportModal";
import { useState } from "react";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

const BukuReferensi = () => {
    const {
        buku,
        loading,
        modalOpen,
        editingBuku,
        setModalOpen,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
        handleExportTemplate,
        handleImportBukuReferensi,
        setFilteredBuku,
        fetchData
    } = useBukuReferensi();

    const [form] = Form.useForm();
    const [isModalImportOpen, setIsModalImportOpen] = useState(false);
    const [filters, setFilters] = useState({
        judul: "",
        penulis: "",
        tahun: "",
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const handleSearch = () => {
        const isFiltersEmpty = !filters.judul && !filters.penulis && !filters.tahun;
        
        if (isFiltersEmpty) {
            // Call fetchData to get default data
            fetchData();
            return;
        }

        const filteredData = buku.filter((item) => {
            const matchJudul = item.judul.toLowerCase().includes(filters.judul.toLowerCase());
            const matchPenulis = item.penulis.toLowerCase().includes(filters.penulis.toLowerCase());
            const matchTahun = item.tahun_terbit.toString().includes(filters.tahun);

            return matchJudul && matchPenulis && matchTahun;
        });

        setFilteredBuku(filteredData);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: 70,
            render: (_, __, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: "Judul",
            dataIndex: "judul",
            key: "judul",
            render: (text) => text,
        },
        {
            title: "Penulis",
            dataIndex: "penulis",
            key: "penulis",
            render: (text) => text,
        },
        {
            title: "Penerbit",
            dataIndex: "penerbit",
            key: "penerbit",
            render: (text) => text,
        },
        {
            title: "Tahun Terbit",
            dataIndex: "tahun_terbit",
            key: "tahun_terbit",
            render: (text) => text,
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
                    <Popconfirm
                        title="Yakin ingin menghapus buku ini?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ya"
                        cancelText="Tidak"
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            style={{
                                backgroundColor: "#ff4d4f",
                                borderColor: "#ff4d4f",
                            }}
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <DefaultLayout title="Buku Referensi">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-xl font-bold mb-4">Buku Referensi</h1>

                {/* Buttons Section */}
                <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={handleExportTemplate}>
                        Download Template
                    </Button>
                    <Button
                        type="default"
                        icon={<UploadOutlined />}
                        onClick={() => setIsModalImportOpen(true)}>
                        Import Buku
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            form.resetFields();
                            handleAdd();
                        }}>
                        Tambah Buku
                    </Button>
                </div>

                {/* Filter Section */}
                <div className="mb-4 flex gap-4">
                    <Input
                        placeholder="Cari Judul Buku"
                        value={filters.judul}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, judul: e.target.value }))
                        }
                    />
                    <Input
                        placeholder="Cari Penulis"
                        value={filters.penulis}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, penulis: e.target.value }))
                        }
                    />
                    <Input
                        placeholder="Cari Tahun Terbit"
                        value={filters.tahun}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, tahun: e.target.value }))
                        }
                    />
                    <Button type="primary" onClick={handleSearch}>
                        <SearchOutlined />
                    </Button>
                </div>

                {/* Table Section */}
                <Table
                    className="overflow-x-auto"
                    dataSource={buku}
                    columns={columns}
                    loading={loading}
                    pagination={{
                        ...pagination,
                        total: buku.length,
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
            </div>

            <ImportModal
                isOpen={isModalImportOpen}
                setIsOpen={setIsModalImportOpen}
                handleImport={handleImportBukuReferensi}
                title="Import Buku Referensi"
            />

            <Modal
                title={editingBuku ? "Edit Buku Referensi" : "Tambah Buku Referensi"}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                onOk={() => form.submit()}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => handleSubmit(values)}
                    initialValues={editingBuku || {}}>
                    <Form.Item
                        name="judul"
                        label="Judul"
                        rules={[{ required: true, message: "Harap masukkan judul" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="penulis"
                        label="Penulis"
                        rules={[{ required: true, message: "Harap masukkan penulis" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="penerbit" label="Penerbit">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tahun_terbit"
                        label="Tahun Terbit"
                        rules={[
                            {
                                required: true,
                                message: "Harap masukkan tahun terbit"
                            },
                            {
                                validator: async (_, value) => {
                                    if (value) {
                                        const year = parseInt(value);
                                        const currentYear = new Date().getFullYear();
                                        if (isNaN(year) || year < 1900 || year > currentYear) {
                                            throw new Error(`Tahun harus antara 1900 - ${currentYear}`);
                                        }
                                    }
                                }
                            }
                        ]}>
                        <Input 
                            type="number" 
                            min={1900}
                            max={new Date().getFullYear()}
                            placeholder="Contoh: 2024"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </DefaultLayout>
    );
};

export default BukuReferensi;
