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
  icon?: React.ReactNode;
  linkName: string;
  href: string;
  currentRoute?: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) {

  return (
    <Link
      href={href}
      onMouseEnter={() => {
        onMouseEnter();
      }}
      onClick={onClick}
      style={{
        backgroundColor: currentRoute ? "#dc2626" : "",
        borderRadius: "10px",
      }}
    >
      <div className="relative group py-1.5 px-3 w-fit flex gap-2 items-center">
        {currentRoute ? icon : null}
        <h1 className="text-nowrap" >
          {linkName}
        </h1>
      </div>
    </Link>
  );
}
