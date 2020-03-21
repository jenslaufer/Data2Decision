import React from "react";

interface LinkProps {
  href?: string;
  active?: boolean;
  onClick: () => void;
  children: any;
}

function Link({ href, active, onClick, children }: LinkProps) {
  return (
    <a
      href={href}
      className={`hover:text-blue-800 cursor-pointer ${
        !active ? "text-blue-500" : "text-blue-700"
      }`}
      onClick={() => onClick()}
    >
      {children}
    </a>
  );
}

export default Link;
