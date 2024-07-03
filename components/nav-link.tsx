"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function NavLink({
  icon,
  linkName,
  href,
  currentRoute,
  onMouseEnter,
  onClick,
}: {
  icon: React.ReactNode;
  linkName: string;
  href: string;
  currentRoute: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) {
  const [ishovered, setishovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => {
        onMouseEnter();
        setishovered(true);
      }}
      onMouseLeave={() => setishovered(false)}
      onClick={onClick}
      style={{
        backgroundColor: currentRoute ? "#dc2626" : "",
        borderRadius: "50px",
      }}
    >
      <div className="relative group p-2 w-fit ">
        {icon}
        <h1
          className={` absolute  bottom-0 transform -translate-x-1/2 left-1/2 text-nowrap 
            ${
              ishovered
                ? "-translate-y-14 text-black scale-100 bg-white"
                : "scale-0 text-transparent"
            }
              delay-200  transition-all   px-2  rounded-md`}
        >
          {linkName}
        </h1>
      </div>
    </Link>
  );
}
