"use client";
import axios, { AxiosResponse, AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import DropDown from "./dropdown"; // Fix: Correct the casing of the import statement

import './styles.css';
interface Notification {
  postId: string;
  userId: string;
  Type: string;
  FromUserId: string;
  Text: string;
  Time: string;
}

export default function NotificationDisplay() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);


  const fetchNotifications = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        "/api/notifications",
        {
          params: {
            userId: window.localStorage.getItem("spotifyid"),
          },
        }
      );
      console.log(response.data.notifications);
      const transformedNotifications: Notification[] =
        response.data.notifications.map((notification: any) => ({
          postId: notification.postId,
          userId: notification.userId,
          Type: notification.Type,
          FromUserId: notification.FromUserId,
          Text: notification.Text,
          Time: notification.Time,
        }));
      setNotifications(transformedNotifications);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [showDropDown]);

  const toggleDropDown = (): void => {
    setShowDropDown((prevState) => !prevState);
  };

    return (
      <div >
        <div
          className={showDropDown ? "active" : undefined}
          onClick={toggleDropDown}
        >
          <Image
            src="/notification.png"
            alt="image not found"
            width={200}
            height={200}
          />
          {showDropDown && (
            <DropDown
              notifications={notifications}
              showDropDown={showDropDown}
              toggleDropDown={toggleDropDown}
            />
          )}
        </div>
      </div>
    );
  };

  

