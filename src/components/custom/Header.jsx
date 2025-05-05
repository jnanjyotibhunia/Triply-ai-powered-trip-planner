import React, { useEffect , useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";


function Header() {
   const [openDialog, setopenDialog] = useState(false);
   const navigate= useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
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
      });
  };

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="shadow-sm flex justify-between items-center px-4">
      <Link to={"/"}>
        <img src="/logo.png" className="h-18"></img>
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <Link to={"/create-trip"}><Button variant="outline" className="rounded-full font-medium cursor-pointer">+ Create Trip</Button></Link>
            <Link to={"/my-trip"}><Button variant="outline" className="rounded-full font-medium cursor-pointer">My trips</Button></Link>
            <Popover>
             <PopoverTrigger>
             <Button className="h-[35px] w-[35px] rounded-full bg-emerald-600 font-medium text-xl hover:cursor-pointer">{user.name[0]}</Button>
             </PopoverTrigger>
             <PopoverContent><h2 className="font-medium text-md cursor-pointer"
              onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
                navigate("/")
                
              }}>Sign out</h2></PopoverContent>
             </Popover>

          </div>
        ) : (
          <Button onClick={()=> setopenDialog(true)}   className="hover:cursor-pointer">Sign In</Button>
        )}
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

export default Header;
