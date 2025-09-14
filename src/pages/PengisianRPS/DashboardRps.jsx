import { useState } from "react";
import { Select } from "antd";
import { usePengisianRpsData } from "../../hooks/PengisianRPS/usePengisianRpsData";
import DefaultLayout from "../../layouts/DefaultLayout";

const DashboardRps = () => {
    const { matkulDropdown } = usePengisianRpsData();
    const [selectedMatkul, setSelectedMatkul] = useState(null);

    const handleChange = (value) => {
        setSelectedMatkul(value);
    };

    return (
        <DefaultLayout>
            <h1>Dashboard RPS</h1>

            <div style={{ marginBottom: "1rem" }}>
                <label>Pilih Mata Kuliah:</label>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Pilih mata kuliah"
                    onChange={handleChange}
                    options={matkulDropdown.map((matkul) => ({
                        label: matkul.nama,
                        value: matkul.mk_id,
                    }))}
                />
            </div>

            {selectedMatkul && (
                <h2>Nama Mata Kuliah: {matkulDropdown.find((m) => m.id === selectedMatkul)?.nama}</h2>
            )}
        </DefaultLayout>
    );
};

export default DashboardRps;
