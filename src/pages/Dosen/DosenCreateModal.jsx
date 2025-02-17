import { useState } from "react";
import { Modal, Input, Select, Form, Button, message, Spin } from "antd";
import { useDosenData } from "../../hooks/Dosen/useDosenData";
import { addDosen } from "../../service/PengisianRps/dosen";

const { Option } = Select;

const DosenCreateModal = ({ visible, onClose }) => {
    const { jurusanDropdown, filteredProdi, setJurusanId, fetchDosen } = useDosenData();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedProdi, setSelectedProdi] = useState([]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            
            await addDosen(values);

            message.success('Dosen berhasil ditambahkan dan password telah dikirim ke email');

            await fetchDosen();  // Tunggu data baru sebelum menutup modal
            
            setLoading(false);
            onClose();
        } catch (error) {
            message.error('Gagal menambahkan dosen: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Tambah Dosen"
            open={visible}
            onCancel={!loading ? onClose : undefined}  // Cegah modal ditutup saat loading
            footer={[
                <Button key="cancel" onClick={onClose} disabled={loading}>
                    Batal
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    Simpan
                </Button>,
            ]}
        >
            <Spin spinning={loading}>  {/* Tambahkan Spinner untuk Indikasi Loading */}
                <Form form={form} layout="vertical">
                    <Form.Item name="kode" label="Kode Dosen" rules={[{ required: true, message: "Kode wajib diisi!" }, {max:6, message:  "maksimal 6 karakter"}]}>
                        <Input placeholder="Masukkan Kode Dosen" disabled={loading} />
                    </Form.Item>
                    <Form.Item
                        name="nip"
                        label="NIP"
                        rules={[
                            { required: true, message: "NIP wajib diisi!" },
                            { min: 18, max: 18, message: "NIP harus 18 karakter!" },
                        ]}
                    >
                        <Input placeholder="Masukkan NIP" disabled={loading} />
                    </Form.Item>
                    <Form.Item name="nama" label="Nama Dosen" rules={[{ required: true, message: "Nama wajib diisi!" }]}>
                        <Input placeholder="Masukkan Nama Dosen" disabled={loading} />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email wajib diisi!" }]}>
                        <Input type="email" placeholder="Masukkan Email" disabled={loading} />
                    </Form.Item>
                    <Form.Item name="jenisKelamin" label="Jenis Kelamin" rules={[{ required: true }]}>
                        <Select placeholder="Pilih Jenis Kelamin" disabled={loading}>
                            <Option value="L">Laki-laki</Option>
                            <Option value="P">Perempuan</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="jurusan" label="Jurusan" rules={[{ required: true }]}>
                        <Select 
                            placeholder="Pilih Jurusan"
                            onChange={(value) => setJurusanId(value)}
                            disabled={loading}
                        >
                            {jurusanDropdown.map((jurusan) => (
                                <Option key={jurusan.id} value={jurusan.id}>
                                    { jurusan.nama }
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="prodi" label="Program Studi" rules={[{ required: true, message: "Pilih minimal satu prodi!" }]}>
                        <Select 
                            mode="multiple"
                            placeholder="Pilih Program Studi"
                            value={selectedProdi}
                            onChange={(value) => setSelectedProdi(value)}
                            disabled={loading}
                        >
                            {filteredProdi.map((prodi) => (
                                <Option key={prodi.id} value={prodi.id}>
                                    { prodi.name }
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default DosenCreateModal;
