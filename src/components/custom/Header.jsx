import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  // Safe parsing of localStorage 'user'
  let user = null;
  try {
    const rawUser = localStorage.getItem('user');
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    localStorage.removeItem('user'); // prevent repeated crashes
  }

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log("Parsed user:", user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Login Error:", error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      }
    }).then((resp) => {
      console.log("Google profile:", resp.data);
      if (resp.data) {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      }
    }).catch(err => {
      console.error("Failed to fetch user profile:", err);
    });
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-4'>
      <img src='/logo.svg' alt="Logo" />
      <div>
      {user?.picture ? (
  <div className='flex items-center gap-4'>
    <a href="/create-trip">
      <Button variant="outline" className="rounded-full">Create Trip</Button>
    </a>
    <a href="/my-trips">
      <Button variant="outline" className="rounded-full">My Trips</Button>
    </a>
    <Popover>
      <PopoverTrigger>
        <img src={user.picture} className='rounded-full w-[38px] h-[38px]' alt="User" />
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="cursor-pointer" onClick={() => {
          googleLogout();
          localStorage.clear();
          window.location.reload();
        }}>Logout</h2>
      </PopoverContent>
    </Popover>
  </div>
) : (
  <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
)}

      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
