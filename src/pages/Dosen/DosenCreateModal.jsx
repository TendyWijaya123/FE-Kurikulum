import { useState } from "react";
import { Modal, Input, Select, Form, Button } from "antd";
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
            console.log("Data Dosen Baru:", values);
            setLoading(false);
            onClose();
            await fetchDosen();
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Tambah Dosen"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Batal
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    Simpan
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="kode" label="Kode Dosen" rules={[{ required: true, message: "Kode wajib diisi!" }, {max:6, message:  "maksimal 6 karakter"}]}>
                    <Input placeholder="Masukkan Kode Dosen" />
                </Form.Item>
                <Form.Item
                    name="nip"
                    label="NIP"
                    rules={[
                        { required: true, message: "NIP wajib diisi!" },
                        { min: 18, max: 18, message: "NIP harus 18 karakter!" },
                    ]}
                >
                    <Input placeholder="Masukkan NIP" />
                </Form.Item>

                <Form.Item name="nama" label="Nama Dosen" rules={[{ required: true, message: "Nama wajib diisi!" }]}>
                    <Input placeholder="Masukkan Nama Dosen" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email wajib diisi!" }]}>
                    <Input type="email" placeholder="Masukkan Email" />
                </Form.Item>
                <Form.Item name="jenisKelamin" label="Jenis Kelamin" rules={[{ required: true }]}>
                    <Select placeholder="Pilih Jenis Kelamin">
                        <Option value="L">Laki-laki</Option>
                        <Option value="P">Perempuan</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="jurusan" label="Jurusan" rules={[{ required: true }]}>
                    <Select 
                        placeholder="Pilih Jurusan"
                        onChange={(value) => {
                            setJurusanId(value);
                        }}
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
                    >
                    {filteredProdi.map((prodi) => (
                        <Option key={prodi.id} value={prodi.id}>
                            { prodi.name }
                        </Option>
                    ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DosenCreateModal;
