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

    useEffect(() => {
        const unsubscribes = [];
    
        const listenToRoom = (roomId) => {
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
                createdAt: data.createdAt?.toDate?.() || new Date(),
                readBy: data.readBy || [],
              });
    
              const currentUserId = user.id;
              if (!data.readBy?.includes(currentUserId) && data.sender_id !== currentUserId) {
                const msgRef = doc(db, `rooms/${roomId}/messages`, docSnap.id);
                updateDoc(msgRef, {
                  readBy: arrayUnion(currentUserId),
                });
              }
            });
    
            setMessages((prev) => {
              const filtered = prev.filter((m) => m.roomId !== roomId);
              return [...filtered, ...msgs];
            });
          });
    
          unsubscribes.push(unsubscribe);
        };
    
        const fetchRooms = async () => {
          const snapshot = await getDocs(collection(db, `rooms`));
          const rooms = [];
          snapshot.forEach((roomDoc) => {
            rooms.push({
              id: roomDoc.id,
              name: roomDoc.data()?.name || `Room ${roomDoc.id}`,
            });
            listenToRoom(roomDoc.id); 
          });
          setRoomList(rooms);
        };
    
        if (user?.roles?.includes("P2MPP")) {
          fetchRooms();
        } else if (user?.prodiId) {
          listenToRoom(user.prodiId);
          setActiveRoomId(user.prodiId);
        }
    
        return () => unsubscribes.forEach((unsub) => unsub());
      }, [user]);

      const handleSend = async () => {
        if (!newMsg.trim() || !activeRoomId) return;
            try {
                const sendChatData = {
                    text: newMsg,
                    roomId: activeRoomId,
                };
                await sendChat(sendChatData);
                setNewMsg("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        };

    return {
        messages,
        roomList,
        activeRoomId,
        user,
        newMsg,
        setActiveRoomId,
        setMessages,
        setRoomList,
        setNewMsg,
        handleSend,
    };
}