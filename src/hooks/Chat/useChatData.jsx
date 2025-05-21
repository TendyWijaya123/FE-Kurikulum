import { db } from "../../utils/config/firebaseConfig";
import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  getDocs
} from "firebase/firestore";
import { sendChat } from "../../service/Chat/chat";
import { AuthContext } from "../../context/AuthProvider";

export const useChatData = () => {
    const [messages, setMessages] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [activeRoomId, setActiveRoomId] = useState(null);
    const { user } = useContext(AuthContext);
    const [loadingSend, setLoadingSend] = useState(false);
    const [sentStatus, setSentStatus] = useState(false);

    useEffect(() => {
      const unsubscribes = [];
      const activeListeners = new Set();

      const listenToRoom = (roomId) => {
        if (activeListeners.has(roomId)) return;
        activeListeners.add(roomId);

        const q = query(
          collection(db, `rooms/${roomId}/messages`),
          orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const msgs = [];
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            msgs.push({
              id: docSnap.id,
              roomId,
              text: data.text,
              displayName: data.sender_name || "Anonim",
              sender_id: data.sender_id,
              createdAt: data.createdAt?.toDate?.() || new Date(),
              readBy: data.readBy || [],
            });
          });

          setMessages((prevMessages) => {
            const filtered = prevMessages.filter((m) => m.roomId !== roomId);
            const combined = [...filtered, ...msgs];
            return combined.sort((a, b) => a.createdAt - b.createdAt);
          });
        });

        unsubscribes.push(unsubscribe);
      };

      const fetchRooms = async () => {
        const snapshot = await getDocs(collection(db, `rooms`));
        const rooms = [];
        snapshot.forEach((roomDoc) => {
          const roomId = roomDoc.id;
          rooms.push({
            id: roomId,
            name: roomDoc.data()?.name || `Room ${roomId}`,
          });
          listenToRoom(roomId); // listen immediately
        });
        setRoomList(rooms);
      };

      if (user?.roles?.includes("P2MPP")) {
        fetchRooms();
      } else if (user?.prodiId) {
        listenToRoom(`${user.prodiId}`);
        setActiveRoomId(`${user.prodiId}`);
      }

      return () => unsubscribes.forEach((unsub) => unsub());
    }, [user]);

      const handleSend = async () => {
          if (!newMsg.trim() || !activeRoomId) return;
          setLoadingSend(true);
          try {
              const sendChatData = {
                  text: newMsg,
                  roomId: activeRoomId,
              };
              await sendChat(sendChatData);
              setNewMsg("");
              setSentStatus(true);
              setTimeout(() => {
                setSentStatus(false);
              }, 2000);
          } catch (error) {
              console.error("Error sending message:", error);
          }finally {
              setLoadingSend(false);
          }
        };

    return {
        messages,
        roomList,
        activeRoomId,
        user,
        newMsg,
        loadingSend,
        sentStatus,
        setActiveRoomId,
        setMessages,
        setRoomList,
        setNewMsg,
        handleSend,
    };
}