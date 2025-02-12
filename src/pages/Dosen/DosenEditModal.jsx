import { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Button } from "antd";
import { useDosenData } from "../../hooks/Dosen/useDosenData";
import { updateDosen } from "../../service/PengisianRps/dosen"; // Fungsi update

const { Option } = Select;

const DosenEditModal = ({ visible, onClose, dosenData }) => {
    const { jurusanDropdown, filteredProdi, setJurusanId } = useDosenData();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedProdi, setSelectedProdi] = useState([]);

    // Mengisi data awal ketika modal dibuka
    useEffect(() => {
        if (dosenData) {
            form.setFieldsValue({
                kode: dosenData.kode,
                nip: dosenData.nip,
                nama: dosenData.nama,
                email: dosenData.email,
                jenisKelamin: dosenData.jenisKelamin,
                jurusan: dosenData.jurusan,
                prodi: Array.isArray(dosenData?.prodi) ? dosenData.prodi.map((p) => p.id) : [],
            });
            setJurusanId(dosenData.jurusan)
            setSelectedProdi(dosenData.prodi.map((p) => p.id));
        }
    }, [dosenData, form]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            await updateDosen(dosenData._id, values); // Kirim update ke backend
            console.log("Dosen berhasil diperbarui:", values);
            setLoading(false);
            onClose();
        } catch (error) {
            setLoading(false);
            console.error("Gagal memperbarui dosen", error);
        }
    };

    return (
        <Modal
            title="Edit Dosen"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Batal
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    Simpan Perubahan
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="kode" label="Kode Dosen" rules={[{ required: true, message: "Kode wajib diisi!" }]}>
                    <Input placeholder="Masukkan Kode Dosen" />
                </Form.Item>
                <Form.Item name="nip" label="NIP" rules={[{ required: true, message: "NIP wajib diisi!" }]}>
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
                                {jurusan.nama}
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
                                {prodi.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DosenEditModal;
