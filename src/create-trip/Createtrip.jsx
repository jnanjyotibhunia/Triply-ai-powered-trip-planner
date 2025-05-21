import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  SelectBudgetList,
  SelectTravelsList,
  AI_PROMPT,
} from "@/constants/Option";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/Firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";




function Createtrip() {
  const [place, setplace] = useState();

  const [formdata, setformdata] = useState([]);

  const [openDialog, setopenDialog] = useState(false);

  const [loading, setloading] = useState(false);

  const navigate=useNavigate();

  const handleinputchange = (name, value) => {
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const login = useGoogleLogin({
    onSuccess: (coderes) => {
      userprofile(coderes);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const userprofile = (tokeninfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setopenDialog(false);
        onGeneratetrip();
      });
  };

  const onGeneratetrip = async () => {
    if (
      (formdata?.noofdays > 5 && !formdata?.location) ||
      !formdata?.budget ||
      !formdata?.person
    ) {
      toast("Please fill all details");
      return;
    }

    const user = localStorage.getItem("user");

    if (!user) {
      setopenDialog(true);
      return;
    }
    toast("Please wait... We are working on it...");
    setloading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formdata?.location?.label
    )
      .replace("{totalDays}", formdata?.noofdays)
      .replace("{traveler}", formdata?.person)
      .replace("{budget}", formdata?.budget)
      //.replace("{totalDays}", formdata?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setloading(false);
    saveaitrip(result?.response?.text());
  };

  const saveaitrip = async (tripdata) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "Trips", docId), {
      userSelection: formdata,
      tripData: JSON.parse(tripdata),
      userEmail: user?.email,
      id: docId,
    });
    setloading(false);
    navigate('/view-trip/'+docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl-10 px-5 mt-15">
      <h2 className="font-bold text-3xl ">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-xl text-gray-500">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="flex flex-col gap-10">
        <div className="mt-20 ">
          <h2 className="text-xl font-medium mb-3">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setplace(v);
                handleinputchange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl font-medium mb-3 ">
            How many days are you planning your trip?
          </h2>
          <Input
            type="number"
            placeholder={"Enter no of days (less than 5)"}
            onChange={(e) => {
              handleinputchange("noofdays", e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mt-14">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {SelectBudgetList.map((item, index) => (
            <div
              key={index}
              className={`p-2 border cursor-pointer rounded-lg hover:shadow-md ${
                formdata?.budget == item.title && "shadow:lg border-black"
              }`}
              onClick={() => {
                handleinputchange("budget", item.title);
              }}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium mt-14">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`p-2 border cursor-pointer rounded-lg hover:shadow-md ${
                formdata?.person == item.people && "shadow:lg border-black"
              }`}
              onClick={() => {
                handleinputchange("person", item.people);
              }}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-end mb-10">
        <Button
          className="hover:cursor-pointer"
          onClick={onGeneratetrip}
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setopenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="h-20" src="logo.png"></img>
              <h2 className="font-bold">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication Securly</p>
              <Button
                className="w-full mt-5 flex items-center gap-3 cursor-pointer"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Createtrip;
