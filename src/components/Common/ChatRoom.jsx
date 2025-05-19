import React, { useState } from "react";
import { useChatData } from "../../hooks/Chat/useChatData";

const ChatRoom = () => {
  const {
    messages,
    roomList,
    activeRoomId,
    setActiveRoomId,
    user,
    newMsg,
    handleSend,
    setNewMsg
  } = useChatData();

  const [search, setSearch] = useState("");

  const filteredRooms = roomList.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedMessages = [...messages]
    .filter((msg) => msg.roomId === activeRoomId)
    .sort((a, b) => a.createdAt - b.createdAt);

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
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  backgroundColor: room.id === activeRoomId ? "#e0f0ff" : "transparent",
                  borderBottom: "1px solid #eee",
                  fontWeight: room.id === activeRoomId ? "bold" : "normal",
                  transition: "background 0.2s",
                }}
              >
                {room.name}
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
            ? `Room: ${roomList.find((r) => r.id === activeRoomId)?.name || "P2MPP"}`
            : "Pilih Room untuk mulai chat"}
        </div>

        {/* Chat Messages */}
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
                  e.preventDefault(); // Supaya tidak bikin baris baru
                  handleSend();
                }
              }}
            />

            <button
              onClick={handleSend}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 16px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
              }}
            >
              Kirim
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
