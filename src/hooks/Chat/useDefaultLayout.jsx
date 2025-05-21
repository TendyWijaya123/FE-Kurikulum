import { useEffect, useContext, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, getDocs } from "firebase/firestore";
import { db } from "../../utils/config/firebaseConfig";
import { AuthContext } from "../../context/AuthProvider";

export const useDefaultLayout = () => {
    const { user } = useContext(AuthContext);
    const [countUnRead, setCountUnRead] = useState(0);

    useEffect(() => {
        if (!user) return;

        const unsubscribes = [];
        const currentUserId = user.id;

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
                    !data.readBy?.includes(currentUserId) &&
                    data.sender_id !== currentUserId
                ) {
                    unreadInRoom++;
                }
                });

                setCountUnRead((prevCount) => prevCount + unreadInRoom);
            });

            unsubscribes.push(unsubscribe);
        };

        const fetchRooms = async () => {
            const snapshot = await getDocs(collection(db, `rooms`));
            snapshot.forEach((roomDoc) => {
                listenToRoom(roomDoc.id);
            });
        };

        if (user.roles?.includes("P2MPP")) {
            setCountUnRead(0); // Reset count when user is P2MPP
            fetchRooms();
        } else if (user.prodiId) {
            setCountUnRead(0); // Reset count when user is not P2MPP
            listenToRoom(user.prodiId);
        }

        return () => unsubscribes.forEach((unsub) => unsub());
  }, [user]);

  

  return {
    setCountUnRead,
    countUnRead,
  };
}