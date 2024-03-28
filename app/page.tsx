"use client"

import {useRouter} from "next/navigation";
import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login')
  },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <></>
  );
}
