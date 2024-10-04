import React, { useState, useEffect } from "react";
import defaultProfileImage from "../../assets/defaultProfileImage.png";

interface AvatarProps {
  user: {
    _id?: string;
    name?: string;
    profileImage?: string;
  };
  style: string;
}

export const Avatar: React.FC<AvatarProps | null> = ({ user, style }) => {
  const [imageSrc, setImageSrc] = useState<string>(defaultProfileImage);

  useEffect(() => {
    if (user && user.profileImage) {
      fetch(`/image/${user.profileImage}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          setImageSrc(URL.createObjectURL(blob));
        })
        .catch((err) => {
          console.error("Error fetching image:", err);
          setImageSrc(defaultProfileImage);
        });
    }
  }, []);

  return (
    <figure className={style}>
      <img src={imageSrc} alt={"Profile Avatar"} />
    </figure>
  );
};
