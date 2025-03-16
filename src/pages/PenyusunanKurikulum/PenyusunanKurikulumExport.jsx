import { useEffect, useState } from "react";
import { Select, Spin, Typography, Button } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { getProdiKurikulumDropdown } from "../../service/api";
import { exportPenyusunanKurikulum } from "../../service/Export/ExportService";
import { DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PenyusunanKurikulumExport = () => {
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [kurikulumDropdown, setKurikulumDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);
	const [selectedKurikulum, setSelectedKurikulum] = useState(null);
	const [loading, setLoading] = useState(true);
	const [downloading, setDownloading] = useState(false);

	const fetchProdiDropdown = async () => {
		try {
			setLoading(true);
			const data = await getProdiKurikulumDropdown();
			setProdiDropdown(data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProdiDropdown();
	}, []);

	const handleProdiChange = (value) => {
		setSelectedProdi(value);
		setSelectedKurikulum(null); // Reset pilihan kurikulum saat prodi berubah
		const selected = prodiDropdown.find((prodi) => prodi.id === value);
		setKurikulumDropdown(selected?.kurikulums || []);
	};

	const handleKurikulumChange = (value) => {
		setSelectedKurikulum(value);
	};

	const handleDownload = async () => {
		if (!selectedKurikulum) return;
		try {
			setDownloading(true);
			await exportPenyusunanKurikulum(selectedKurikulum);
		} catch (error) {
			console.error("Gagal mendownload file:", error);
		} finally {
			setDownloading(false);
		}
	};

	return (
		<DefaultLayout title="Export Penyusunan Kurikulum">
			<div className="w-full  mx-auto p-6 bg-white shadow-lg rounded-lg">
				<Title level={4} className="text-center text-gray-700 mb-4">
					Pilih Prodi dan Kurikulum
				</Title>

				{loading ? (
					<div className="flex justify-center py-10">
						<Spin size="large" />
					</div>
				) : (
					<>
						<div className="mb-4 ">
							<Title level={5} className="text-gray-600">
								Pilih Program Studi
							</Title>
							<Select
								className="w-full"
								placeholder="Pilih Prodi"
								value={selectedProdi}
								onChange={handleProdiChange}
								options={prodiDropdown.map((prodi) => ({
									label: prodi.name,
									value: prodi.id,
								}))}
							/>
						</div>

						<div className="mb-4">
							<Title level={5} className="text-gray-600">
								Pilih Kurikulum
							</Title>
							<Select
								className="w-full"
								placeholder="Pilih Kurikulum"
								disabled={!selectedProdi}
								value={selectedKurikulum}
								onChange={handleKurikulumChange}
								options={kurikulumDropdown.map((kurikulum) => ({
									label: `Kurikulum ${kurikulum.tahun_awal} - ${kurikulum.tahun_akhir}`,
									value: kurikulum.id,
								}))}
							/>
						</div>

						<Button
							icon={<DownloadOutlined />}
							type="primary"
							disabled={!selectedKurikulum || downloading}
							loading={downloading}
							onClick={handleDownload}
							className="w-full">
							{downloading ? "Downloading..." : "Download "}
						</Button>
					</>
				)}
			</div>
		</DefaultLayout>
	);
};

export default PenyusunanKurikulumExport;
