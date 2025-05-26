import { useState, useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FloatingButton from "../components/Button/FloatingButton";
import { Drawer, Layout, Typography } from "antd";
import ChatRoom from "../components/Common/ChatRoom";
import { useNotifikasiChat } from "../context/notifikasiChatProvider";
import { SelectionContext } from "../context/SelectionContext";

const { Footer: AntFooter } = Layout;
const { Text, Paragraph } = Typography;

const DefaultLayout = ({ children, title }) => {
    const [isCollapseSidebar, setIsCollapseSidebar] = useState(true);
    const [openChat, setOpenChat] = useState(false);
    const { countUnRead } = useNotifikasiChat();
    const { selectedOption } = useContext(SelectionContext);

    return (
        <div className="flex min-h-screen w-full font-sans text-black relative overflow-x-hidden">
            <div className="w-full flex relative">
                {/* Sidebar */}
                <Sidebar isOpen={isCollapseSidebar} />

                {/* Main Content */}
                <div
                    className="flex flex-col h-full bg-gray-200 transition-all duration-300"
                    style={{
                        width: isCollapseSidebar ? "calc(100% - 256px)" : "100%",
                        marginLeft: isCollapseSidebar ? "256px" : "0px",
                    }}
                >
                    {/* Header */}
                    <Header
                        title={title}
                        openSidebar={() => {
                            setIsCollapseSidebar(!isCollapseSidebar);
                        }}
                    />

                    {/* Children */}
                    <div className="p-4 flex-1 overflow-y-auto h-[calc(100vh-64px)]">
                        {children}
                    </div>
                </div>

                {selectedOption === "kurikulum" && (
                    <>
                        <FloatingButton onClick={() => setOpenChat(true)} count={countUnRead} />
                        <Drawer
                            title="Room Chat"
                            placement="right"
                            width={600}
                            onClose={() => setOpenChat(false)}
                            open={openChat}
                        >
                            <ChatRoom />
                        </Drawer>
                    </>
                )}
            </div>
        </div>
    );
};

export default DefaultLayout;
