import { Modal, Form, Select, Input, InputNumber, Button } from "antd";
import React from "react";

const FormValidasiModal = ({
  isVisible,
  onOk,
  onCancel,
  form,
  kemampuanAkhirDropdown,
  tujuanBelajarDropdown,
  cplDropdown,
  handleAddRowRps
}) => {

    const handleSubmit = async () => {
        try {
        const values = await form.validateFields();
        const kategori = values.kategori;

        if (kategori === "Reguler") {
            handleAddRowRps();
            onOk(kategori); 
        } else {
            onOk(kategori); 
        }
        } catch (error) {
        console.log("Validation error:", error);
        }
    };
  return (
    <Modal
      title="Form Validasi"
      open={isVisible}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText="Submit"
      cancelText="Cancel"
      width={800}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          mata_kuliah_id: "",
          kemampuan_akhir_id: "",
          minggu: "",
          pokok_bahasan: "",
          modalitas_bentuk_strategi_metodepembelajaran: "",
          instrumen_penilaian: "",
          hasil_belajar: "",
          tujuan_belajar_id: "",
          cpl_id: "",
          bobot_penilaian: "",
        }}>
            <Form.Item
                label="Kategori"
                name="kategori"
                rules={[{ required: true, message: "Kategori wajib diisi!" }]}>
                <Select placeholder="Pilih Kategori" allowClear>
                    <Select.Option value="ETS">ETS</Select.Option>
                    <Select.Option value="EAS">EAS</Select.Option>
                    <Select.Option value="Reguler">Reguler</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => {
                    const kategori = form.getFieldValue("kategori");

                    if (!kategori) return null;

                    return (
                        <>
                            {/* {kategori === "Reguler" && (
                                <>
                                    <Form.Item
                                        label="Kemampuan Akhir"
                                        name="kemampuan_akhir_id">
                                        <Select placeholder="Pilih Kemampuan Akhir" allowClear>
                                            {kemampuanAkhirDropdown.map((item) => (
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.deskripsi}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Tujuan Belajar"
                                        name="tujuan_belajar_id">
                                        <Select placeholder="Pilih Tujuan Belajar" allowClear>
                                            {tujuanBelajarDropdown.map((item) => (
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.kode}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="CPL" name="cpl_id">
                                        <Select placeholder="Pilih CPL" allowClear>
                                            {cplDropdown.map((item) => (
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.kode}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Pokok Bahasan"
                                        name="pokok_bahasan"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Pokok bahasan wajib diisi!",
                                            },
                                        ]}>
                                        <Input.TextArea rows={3} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Modalitas, Bentuk Strategi, dan Metode Pembelajaran"
                                        name="modalitas_bentuk_strategi_metodepembelajaran">
                                        <Input.TextArea rows={3} />
                                    </Form.Item>

                                    <Form.Item label="Hasil Belajar" name="hasil_belajar">
                                        <Input.TextArea rows={3} />
                                    </Form.Item>
                                </>
                            )} */}

                            {kategori !== "Reguler" && (
                                <>
                                <Form.Item
                                    label="Minggu"
                                    name="minggu"
                                    rules={[
                                        { required: true, message: "Minggu wajib diisi!" },
                                    ]}>
                                    <InputNumber className="w-full" />
                                </Form.Item>

                                <Form.Item label="Bobot Penilaian" name="bobot_penilaian">
                                    <InputNumber className="w-full" />
                                </Form.Item>
                                </>
                            )}
                        </>
                    );
                }}
            </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormValidasiModal;
                                
                                    
