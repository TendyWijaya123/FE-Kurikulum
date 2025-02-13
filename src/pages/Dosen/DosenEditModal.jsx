import { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Button, message} from "antd";
import { useDosenData } from "../../hooks/Dosen/useDosenData";
import { updateDosen } from "../../service/PengisianRps/dosen"; // Fungsi update

const { Option } = Select;

const DosenEditModal = ({ visible, onClose, dosenData }) => {
    const { jurusanDropdown, filteredProdi,prodiDropdown, setJurusanId } = useDosenData();
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
                jurusan:jurusanDropdown.find((j) => j.nama === dosenData.jurusan)?.id || null,
                isActive: dosenData.isActive === 1 ? true : false,
            });
            setJurusanId(
                jurusanDropdown.find((j) => j.nama === dosenData.jurusan)?.id || null
            );
            
            const prodiIds = dosenData.prodi
                .map((prodiNama) => {
                    const foundProdi = prodiDropdown.find((p) => p.name === prodiNama);
                    return foundProdi ? foundProdi.id : null;
                })
                .filter((id) => id !== null); // Menghapus nilai `null`
            setSelectedProdi(prodiIds);
            form.setFieldsValue({ prodi: prodiIds }); // Set nilai awal Select       
        }
    }, [dosenData, form]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            await updateDosen(dosenData._id, values); 
            message.success("Dosen berhasil diperbarui:");
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
                <Form.Item name="isActive" label="Status" rules={[{ required: true }]}>
                    <Select placeholder="Pilih status Dosen">
                        <Option value={true}>Aktif</Option>
                        <Option value={false}>Tidak Aktif</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DosenEditModal;
