import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { Card, Button, Form, Input, Spin, Alert, Descriptions, Modal, message } from 'antd';
import { UserOutlined, MailOutlined, BookOutlined, TeamOutlined, LockOutlined } from '@ant-design/icons';
import useProfile from '../hooks/useProfile';

const Profile = () => {
    const {
        profile,
        loading,
        error,
        passwordFormVisible,
        setPasswordFormVisible,
        handlePasswordSubmit,
        passwordUpdateStatus
    } = useProfile();
    
    const [form] = Form.useForm();

    if (loading) {
        return (
            <DefaultLayout title="My Profile">
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            </DefaultLayout>
        );
    }

    if (error) {
        return (
            <DefaultLayout title="My Profile">
                <Alert message={error} type="error" />
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout title="Profile">
            <div className="w-full flex flex-col justify-center items-start pr-10">
                <div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6">Profile</h2>
                    
                    <Card title="Informasi Pengguna" className="mb-6">
                        <Descriptions bordered column={1}>
                        <Descriptions.Item label={<><UserOutlined /> Username</>}>
                            {profile?.name}
                        </Descriptions.Item>

                        <Descriptions.Item label={<><MailOutlined /> Email</>}>
                            {profile?.email}
                        </Descriptions.Item>

                        {profile?.jurusan ? (
                        <Descriptions.Item label={<><BookOutlined /> Jurusan</>}>
                            {profile?.jurusan?.nama || 'Belum diset'}
                        </Descriptions.Item>
                        ) : (
                        <Descriptions.Item label={<><BookOutlined /> Program Studi</>}>
                            {profile?.prodi?.name || 'Belum diset'}
                        </Descriptions.Item>
                        )}

                        {!profile?.jurusan && (
                            <Descriptions.Item label={<><TeamOutlined /> Role</>}>
                            {profile?.role}
                            </Descriptions.Item>
                        )}
                        </Descriptions>
                    </Card>

                    <Button 
                        type="primary" 
                        onClick={() => setPasswordFormVisible(true)}
                        icon={<LockOutlined />}
                    >
                        Ubah Password
                    </Button>

                    <Modal
                        title="Ubah Password"
                        open={passwordFormVisible}
                        onCancel={() => {
                            setPasswordFormVisible(false);
                            form.resetFields();
                        }}
                        footer={null}
                    >
                        {passwordUpdateStatus.success && (
                            <Alert 
                                message="Berhasil mengubah password" 
                                type="success" 
                                className="mb-4" 
                            />
                        )}
                        
                        {passwordUpdateStatus.error && (
                            <Alert 
                                message={passwordUpdateStatus.error} 
                                type="error" 
                                className="mb-4" 
                            />
                        )}
                        
                        <Form 
                            layout="vertical" 
                            form={form}
                            onFinish={handlePasswordSubmit}
                        >
                            <Form.Item 
                                label="Password Lama"
                                name="current_password"
                                rules={[
                                    { required: true, message: 'Mohon masukkan password lama' }
                                ]}
                            >
                                <Input.Password
                                    placeholder="Masukkan password lama"
                                />
                            </Form.Item>
                            
                            <Form.Item 
                                label="Password Baru"
                                name="new_password"
                                rules={[
                                    { required: true, message: 'Mohon masukkan password baru' },
                                    { min: 8, message: 'Password minimal 8 karakter' }
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    placeholder="Masukkan password baru"
                                />
                            </Form.Item>
                            
                            <Form.Item 
                                label="Konfirmasi Password Baru"
                                name="new_password_confirmation"
                                dependencies={['new_password']}
                                rules={[
                                    { required: true, message: 'mohon konfirmasi password baru' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('new_password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Password baru tidak cocok'));
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    placeholder="Konfirmasi password baru"
                                />
                            </Form.Item>
                            
                            <Form.Item>
                                <div className="flex justify-end">
                                    <Button 
                                        type="default" 
                                        onClick={() => {
                                            setPasswordFormVisible(false);
                                            form.resetFields();
                                        }}
                                        className="mr-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        loading={passwordUpdateStatus.loading}
                                    >
                                        Ubah Password
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;