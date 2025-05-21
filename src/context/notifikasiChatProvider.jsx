import { createContext, useContext, useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../utils/config/firebaseConfig";
import { AuthContext } from "../context/AuthProvider";

const NotifikasiChatContext = createContext();

export const NotifikasiChatProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [countUnRead, setCountUnRead] = useState(0);
  const [unreadCounts, setUnreadCounts] = useState({}); // roomId => unreadCount

  useEffect(() => {
    if (!user?.id) return;

    const currentUserId = user.id;
    let unsubscribes = [];

    const listenToRoom = (roomId) => {
      const q = query(
        collection(db, `rooms/${roomId}/messages`),
        orderBy("createdAt")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let unreadInRoom = 0;

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (
            data.sender_id !== currentUserId &&
            (!data.readBy || !data.readBy.includes(currentUserId))
          ) {
            unreadInRoom++;
          }
        });

        setUnreadCounts((prev) => {
          const updated = { ...prev, [roomId]: unreadInRoom };
          const totalUnread = Object.values(updated).reduce((a, b) => a + b, 0);
          setCountUnRead(totalUnread);
          return updated;
        });
      });

      unsubscribes.push(unsubscribe);
    };

    const fetchRooms = async () => {
      const snapshot = await getDocs(collection(db, "rooms"));
      snapshot.forEach((roomDoc) => {
        listenToRoom(roomDoc.id);
      });
    };

    // Reset states
    setCountUnRead(0);
    setUnreadCounts({});

    if (user.roles?.includes("P2MPP")) {
      fetchRooms();
    } else if (user.prodiId) {
      listenToRoom(user.prodiId);
    }

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [user]);

  return (
    <NotifikasiChatContext.Provider value={{ countUnRead }}>
      {children}
    </NotifikasiChatContext.Provider>
  );
};

export const useNotifikasiChat = () => useContext(NotifikasiChatContext);
