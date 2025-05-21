import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { PHOTO_REF_URL } from "@/service/Globalapi";
import { GetPlacedetails } from "@/service/Globalapi";
import { Button } from "@/components/ui/button";

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
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
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
        <a
          href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
            hotel?.hotelName + " " + hotel?.hotelAddress
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-2 w-full bg-indigo-600 text-white py-1 px-4 rounded-lg hover:bg-indigo-700 transition cursor-pointer">
            Book Now
          </Button>
        </a>
      </div>
    </Link>
  );
}

export default Hotelscard;
