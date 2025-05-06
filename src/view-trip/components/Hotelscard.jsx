import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { PHOTO_REF_URL } from "@/service/Globalapi";
import { GetPlacedetails } from "@/service/Globalapi";

function Hotelscard({ hotel }) {
  const [picurl, setpicurl] = useState();
  useEffect(() => {
    hotel && GetplacePhoto();
  }, [hotel]);
  const GetplacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };
    const result = await GetPlacedetails(data).then((res) => {
      //console.log(res.data);
      //console.log(res.data.places[0].photos[3].name);

      const photourl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      //console.log(photourl);
      setpicurl(photourl);
    });
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.HotelName +
        "," +
        hotel?.HotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={picurl}
          referrerPolicy="no-referrer"
          className="rounded-xl shadow-sm h-[180px] w-full object-cover"
          alt="hotelpic.jpg"
        ></img>
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500 mt-1">
            📍{hotel?.hotelAddress}
          </h2>
          <h2 className="text-sm">💰{hotel.price.replace("from ", "")}</h2>
          <h2 className="text-sm">⭐{hotel.rating.replace("stars", "")}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Hotelscard;
