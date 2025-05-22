import { useState, useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FloatingButton from "../components/Button/FloatingButton";
import { Drawer, Layout, Typography } from "antd";
import ChatRoom from "../components/Common/ChatRoom";
import { useNotifikasiChat } from "../context/notifikasiChatProvider";

const { Footer: AntFooter } = Layout;
const { Text, Paragraph } = Typography;

const DefaultLayout = ({ children, title }) => {
    const [isCollapseSidebar, setIsCollapseSidebar] = useState(true);
    const [openChat, setOpenChat] = useState(false);
    const { countUnRead } = useNotifikasiChat();
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex min-h-screen w-full font-sans text-black relative overflow-x-auto">
            {/* Main Layout */}
            <div className="w-full flex relative flex-col">
                <div className="flex flex-grow">
                    {/* Sidebar */}
                    <Sidebar isOpen={isCollapseSidebar} />

                    {/* Main Content */}
                    <div
                        className={`flex flex-col w-full h-full bg-gray-200 transition-all duration-300 ${
                            isCollapseSidebar ? "ml-64" : "ml-0"
                        }`}>
                        {/* Header */}
                        <Header
                            title={title}
                            openSidebar={() => {
                                setIsCollapseSidebar(!isCollapseSidebar);
                            }}
                        />
                        {/* Children */}
                        <div className="p-4 flex-1">{children}</div>
                        
                        {/* Footer with Ant Design */}
                        <AntFooter 
                            style={{ 
                                textAlign: 'center', 
                                padding: '12px 16px',
                                backgroundColor: '#fff',
                                borderTop: '1px solid #f0f0f0'
                            }}
                        >
                            <Paragraph style={{ marginBottom: 4 }}>
                                <Text>© {currentYear} Sistem Penyusunan Kurikulum - Dikembangkan oleh P2MPP</Text>
                            </Paragraph>
                            <Paragraph style={{ marginBottom: 0 }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                    Pusat Penjaminan Mutu dan Pengembangan Pembelajaran                                </Text>
                            </Paragraph>
                        </AntFooter>
                    </div>
                </div>
                <FloatingButton onClick={()=> setOpenChat(true)} count={countUnRead} />
                <Drawer
                    title="Room Chat"
                    placement="right"
                    width={600}
                    onClose={() => setOpenChat(false)}
                    open={openChat}
                >
                    <ChatRoom />
                </Drawer>
            </div>
        </div>
    );
};

export default DefaultLayout;
