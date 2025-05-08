import { Button } from "@/components/ui/button";
import { GetPlacedetails } from "@/service/Globalapi";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { PHOTO_REF_URL } from "@/service/Globalapi";

function Infosection({ trip }) {
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
      console.log(res.data);
      console.log(res.data.places[0].photos[3].name);

      const photourl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      console.log(photourl);
      setpicurl(photourl);
    });
  };
  //console.log(picurl);
  return (
    <div>
      <img
        src={picurl}
        alt="travelpic.jpg"
        referrerPolicy="no-referrer"
        className="h-[330px] w-200 object-cover rounded-xl shadow-sm"
      ></img>
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5 mt-1">
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-500 text-xs md:text-md lg:text-[17px]">
              📅{trip?.userSelection?.noofdays} Day
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-500 text-xs md:text-md lg:text-[17px]">
              💰{trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-500 text-xs md:text-md lg:text-[17px]">
              🥂No. Of Traveler: {trip?.userSelection?.person}
            </h2>
          </div>
        </div>
        <Button className="hover:cursor-pointer">
          <IoShareSocialSharp />
        </Button>
      </div>
    </div>
  );
}

export default Infosection;
