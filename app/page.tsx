"use client"

import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("localhost:3000/login");
  return (
    <></>
  );
}
