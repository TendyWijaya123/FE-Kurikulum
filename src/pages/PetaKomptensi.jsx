import React from "react";
import { 
    Card, 
    Button, 
    Upload, 
    message, 
    Spin, 
    Empty, 
    Row,
    Col,
    Space,
    Popconfirm,
    Typography,
    Divider
} from "antd";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import DefaultLayout from "../layouts/DefaultLayout";
import { usePetaKompetensi } from "../hooks/usePetaKompetensi";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const { Title, Text } = Typography;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const PetaKompetensi = () => {
    const {
        loading,
        uploading,
        deleting,
        petaData,
        handleUpload,
        handleDelete
    } = usePetaKompetensi();

    const [fileList, setFileList] = React.useState([]);

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleFileUpload = async () => {
        if (fileList.length === 0) {
            message.warning('Pilih file terlebih dahulu');
            return;
        }
        await handleUpload(fileList[0].originFileObj);
        setFileList([]);
    };

    const uploadProps = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: file => {
            if (!file.type.startsWith('image/')) {
                message.error('Hanya file gambar yang dapat diunggah!');
                return Upload.LIST_IGNORE;
            }
            if (file.size / 1024 / 1024 > 5) {
                message.error('Ukuran gambar tidak boleh melebihi 5MB!');
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        fileList,
        onChange: handleFileChange,
        maxCount: 1
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/placeholder-image.jpg';
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `${API_URL}/storage/${imagePath}`;
    };

    return (
        <DefaultLayout title="Peta Kompetensi">
            <Card>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Title level={4}>Peta Kompetensi</Title>
                    </Col>
                    <Col span={24}>
                        <Card size="small" title="Upload Gambar Peta Kompetensi">
                            <Row align="middle">
                                <Upload {...uploadProps} listType="picture">
                                    <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                                </Upload>
                                <Button 
                                    type="primary" 
                                    onClick={handleFileUpload} 
                                    loading={uploading}
                                    disabled={fileList.length === 0}
                                    style={{ marginLeft: 16 }}
                                >
                                    Upload
                                </Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Divider />

                <Spin spinning={loading}>
                    {petaData ? (
                        <div style={{ marginTop: 16 }}>
                            <Card
                                title="Gambar Peta Kompetensi"
                                extra={
                                    <Popconfirm
                                        title="Apakah Anda yakin ingin menghapus gambar ini?"
                                        onConfirm={() => handleDelete(petaData.id)}
                                        okText="Ya"
                                        cancelText="Tidak"
                                    >
                                        <Button 
                                            danger
                                            icon={<DeleteOutlined />} 
                                            loading={deleting === petaData.id}
                                        >
                                        </Button>
                                    </Popconfirm>
                                }
                            >
                                <TransformWrapper defaultScale={1}>
                                    <TransformComponent>
                                        <img
                                            src={getImageUrl(petaData.gambar_url)}
                                            alt="Peta Kompetensi"
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            </Card>
                        </div>
                    ) : (
                        <Empty 
                            description="Belum ada gambar peta kompetensi" 
                            style={{ marginTop: 32 }}
                        />
                    )}
                </Spin>
            </Card>
        </DefaultLayout>
    );
};

export default PetaKompetensi;