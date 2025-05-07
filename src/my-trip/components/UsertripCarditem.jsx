import React from "react";
import { useState, useEffect } from "react";
import { GetPlacedetails, PHOTO_REF_URL } from "@/service/Globalapi";
import { Link } from "react-router-dom";

function UsertripCarditem({ trip }) {
  const [picurl, setpicurl] = useState();
  useEffect(() => {
    trip && GetplacePhoto();
  }, [trip]);
  const GetplacePhoto = async () => {
    //console.log(trip?.userSelection?.location?.label)
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlacedetails(data).then((res) => {
      //console.log(res.data);
      //console.log(res.data.places[0].photos[3].name);

      const photourl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[1].name
      );
      //console.log(photourl);
      setpicurl(photourl);
    });
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div>
        <img
          src={picurl}
          alt="travelpic"
          referrerPolicy="no-referrer"
          className="object-cover rounded-xl h-[180px] w-full hover:cursor-pointer"
        ></img>
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noofdays} days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UsertripCarditem;
