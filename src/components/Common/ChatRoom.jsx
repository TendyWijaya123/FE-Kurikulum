import React, { useContext, useEffect, useState } from "react";
import { useChatData } from "../../hooks/Chat/useChatData";
import { db } from "../../utils/config/firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { AppDataContext } from "../../context/AppDataProvider";
import { Button, Spin } from "antd";
import { SendOutlined, CheckOutlined } from "@ant-design/icons";

const ChatRoom = () => {
  const {
    messages,
    activeRoomId,
    setActiveRoomId,
    user,
    newMsg,
    loadingSend,
    sentStatus,
    handleSend,
    setNewMsg,
  } = useChatData();
  const {prodiDropdown} = useContext(AppDataContext);

  useEffect(() => {
    if (!activeRoomId || !messages.length) return;
    const unreadMessages = messages.filter(
      (msg) =>
        msg.roomId === `${activeRoomId}` &&
        msg.sender_id !== user.id &&
        (!msg.readBy || !msg.readBy.includes(user.id))
    );

    // Update readBy di Firestore
    unreadMessages.forEach((msg) => {
      const msgRef = doc(db, `rooms/${msg.roomId}/messages/${msg.id}`);
      updateDoc(msgRef, {
        readBy: arrayUnion(user.id),
      });
    });
  }, [activeRoomId, messages, user]);

  const [search, setSearch] = useState("");

  const prodiList = prodiDropdown.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedMessages = [...messages]
    .filter((msg) => (msg.roomId === `${activeRoomId}` || msg.roomId === activeRoomId))
    .sort((a, b) => a.createdAt - b.createdAt);

  const getUnreadCountByRoom = () => {
    const counts = {};
    messages.forEach((msg) => {
      if (
        msg.sender_id !== user.id &&
        (!msg.readBy || !msg.readBy.includes(user.id))
      ) {
        if (!counts[msg.roomId]) {
          counts[msg.roomId] = 1;
        } else {
          counts[msg.roomId]++;
        }
      }
    });
    return counts;
  };

  const unreadCounts = getUnreadCountByRoom();



  return (
    <div style={{
      display: "flex",
      height: "600px",
      border: "1px solid #ccc",
      borderRadius: 8,
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    }}>
      
      {/* Sidebar Room List */}
      {user?.roles?.includes("P2MPP") && (
        <div style={{
          width: 250,
          borderRight: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>
            Daftar Room
          </div>

          <div style={{ padding: "0 16px 10px", marginTop: 10 }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari room..."
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {prodiList.map((room) => (
              <div
                key={room.id}
                onClick={() => {
                  setActiveRoomId(room.id);
                }}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  backgroundColor: room.id === activeRoomId ? "#e0f0ff" : "transparent",
                  borderBottom: "1px solid #eee",
                  fontWeight: room.id === activeRoomId ? "bold" : "normal",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{room.name}</span>
                {unreadCounts[room.id] > 0 && (
                  <span
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "0.75em",
                      fontWeight: "bold",
                    }}
                  >
                    {unreadCounts[room.id]}
                  </span>
                )}
              </div>
            ))}

          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Room Header */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
          fontWeight: "bold",
          fontSize: "1.1em"
        }}>
          {activeRoomId
            ? `Room: ${prodiList.find((r) => r.id === activeRoomId)?.name || "P2MPP"}`
            : "Pilih Room untuk mulai chat"}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#fff" }}>
          {sortedMessages.map((msg) => (
            <div
              key={`${msg.roomId}-${msg.id}`}
              style={{
                marginBottom: 14,
                padding: "10px",
                borderRadius: 6,
                backgroundColor: "#f2f2f2",
                maxWidth: "75%",
              }}
            >
              <strong>{msg.displayName}</strong>
              <div>{msg.text}</div>
              <div style={{ fontSize: "0.75em", color: "#999", marginTop: 4 }}>
                {msg.createdAt.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        {activeRoomId && (
          <div style={{
            display: "flex",
            padding: "12px 16px",
            borderTop: "1px solid #ccc",
            backgroundColor: "#fafafa"
          }}>
            <textarea
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Ketik pesan..."
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 4,
                border: "1px solid #ccc",
                marginRight: 10,
                resize: "none",             
                maxHeight: "200px",         
                minHeight: "40px",          
                overflowY: "auto",          
                lineHeight: "1.5",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <Button
              type="primary"
              icon={sentStatus ? <CheckOutlined /> : <SendOutlined />}
              onClick={handleSend}
              loading={loadingSend}
              disabled={!newMsg.trim() || loadingSend}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                height: 40,
                borderRadius: 6,
                backgroundColor: sentStatus ? "#52c41a" : undefined,
                borderColor: sentStatus ? "#52c41a" : undefined,
                marginTop: 11,
                color: sentStatus ? "#fff" : undefined,
              }}
            />


          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
