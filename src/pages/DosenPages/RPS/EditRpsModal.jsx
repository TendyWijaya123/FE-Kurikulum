import { Modal, Form, Select, Input, InputNumber, Button } from "antd";
import React from "react";

const EditRpsModal = ({
  isVisible,
  onOk,
  onCancel,
  form,
  editedData,
  kemampuanAkhirDropdown,
  tujuanBelajarDropdown,
  cplDropdown,
}) => {
  return (
    <Modal
      title={<span className="text-xl font-semibold text-gray-800">Edit RPS</span>}
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Update"
      cancelText="Cancel"
      className="rounded-xl"
      width={800}>
      <div className="p-2">
        <Form form={form} layout="vertical" initialValues={editedData}>
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
                            {kategori === "Reguler" && (
                                <>
                                    <Form.Item
                                        label="Kemampuan Akhir"
                                        name="kemampuan_akhir_id">
                                        <Select
                                            placeholder="Pilih Kemampuan Akhir"
                                            allowClear>
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
                            )}

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

                            {kategori === "Reguler" && (
                                <div className="mt-6 border-t border-gray-200 pt-4">
                                    <p className="font-semibold mb-2">
                                        Instrumen Penilaian
                                    </p>
                                    <Form.List name="instrumen_penilaians">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <div
                                                        key={key}
                                                        className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 items-center">
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "jenis_evaluasi"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Jenis evaluasi wajib diisi",
                                                                },
                                                            ]}>
                                                            <Select placeholder="Jenis Evaluasi">
                                                                <Select.Option value="Quiz">
                                                                    Quiz
                                                                </Select.Option>
                                                                <Select.Option value="Project">
                                                                    Project
                                                                </Select.Option>
                                                                <Select.Option value="Case Study">
                                                                    Case Study
                                                                </Select.Option>
                                                                <Select.Option value="Tugas">
                                                                    Tugas
                                                                </Select.Option>
                                                            </Select>
                                                        </Form.Item>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "deskripsi"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Deskripsi wajib diisi",
                                                                },
                                                            ]}>
                                                            <Input placeholder="Deskripsi" />
                                                        </Form.Item>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "bobot_penilaian"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Bobot wajib diisi",
                                                                },
                                                            ]}>
                                                            <InputNumber
                                                                className="w-full"
                                                                placeholder="Bobot"
                                                                min={0}
                                                            />
                                                        </Form.Item>

                                                        <div className="flex justify-end">
                                                            <Button
                                                                type="link"
                                                                onClick={() => remove(name)}
                                                                danger>
                                                                Hapus
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        block>
                                                        + Tambah Instrumen Penilaian
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            )}
                        </>
                    );
                }}
            </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditRpsModal;
