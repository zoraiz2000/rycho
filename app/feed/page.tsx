"use client"

import axios from "axios";
import Image from "next/image";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        let token = window.localStorage.getItem("token")
        if (token) {
            fetchUserFeed(token);
          }
      }, [])  
        
      const fetchUserFeed = async (token: string) => {
        const {data} = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
    
        router.push('/feed/' + data.id)
      }
  ;
}


