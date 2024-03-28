"use client";

import axios from "axios";
import Image from 'next/image';
import {useRouter} from "next/navigation";
import React, { useEffect, useState } from 'react';



export default function LoginPage() {
    const CLIENT_ID = "f9010a7f16bd4939a67261cce4b5cc6f"
    const SCOPE = encodeURIComponent("user-library-read user-top-read playlist-read-private");
    const REDIRECT_URI = "https://rycho.vercel.app/login"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"

    const RESPONSE_TYPE = "token"

    const router = useRouter();
    const [user, setUser] = useState({
      spotifyId: "",
      username: "",
      followers: [],
      following: [],
    })  

    useEffect(() => {
      const hash = window.location.hash
      let storedToken = window.localStorage.getItem("token")
  
      if (hash) {
        storedToken = hash.substring(1).split("&").find((elem: string) => elem.startsWith("access_token"))?.split("=")[1] ?? null
  
        window.location.hash = ""
        window.localStorage.setItem("token", storedToken ?? "")
        fetchUserData()
      }
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      onLogin();
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchUserData = async () => {
      const {data} = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem("token")
        }
      })
      setUser({...user, spotifyId: data.id, username: data.display_name})
      window.localStorage.setItem("spotifyid", data.id)
      console.log("push requested")
      router.push("/profile/" + data.id)
    }


    const onLogin = async () => {
      try {
        const response = await axios.post("/api/users/profile", {
          method: "addUser",
          body: user
        });
        console.log("Login success", response.data);
      } catch (error:any) {
        console.log("Login failed", error.message);
      }
    }

    return (
      <div className="flex flex-col items-center justify-center bg-[#202020] max-w-96 min-h-fit mx-auto rounded-3xl mt-52">
        <h1 className="text-3xl font-semibold text-center text-white mb-8 mt-10">Login with Spotify</h1>
        <Image className="rounded-full object-contain"
          src="/spotify.png"
          alt="image not found"
          width={150} 
          height={30} 
        />
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
          className="p-1.5 px-10 transition duration-500 border-2 border-white-500 hover:border-[#202020] rounded-lg my-10 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-500"
         >
          Login
        </a>
      </div>
    )
}
