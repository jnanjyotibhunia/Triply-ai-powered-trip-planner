import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/Firebaseconfig";
import UsertripCarditem from "./components/UsertripCarditem";

function Mytrip() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }
    setUserTrips([]);
    const q = query(
      collection(db, "Trips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });

    setUserTrips(trips);
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.map((trip, index) => (
          <UsertripCarditem trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default Mytrip;
