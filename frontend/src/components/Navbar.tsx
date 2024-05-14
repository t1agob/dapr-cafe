import React from "react";
import { AccountMenu } from "./AccountMenu";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="h-10 flex justify-between">
      <Link to="/" className="flex align-middle">
        <img
          src="img/dapr-logo.png"
          alt="Dapr cafe logo"
          className="h-14 w-30"
        />
        <p className="text-red-500 text-5xl bg-center -ml-3 mt-1">Dapr Cafe</p>
      </Link>
      <div className="justify-between mr-5 mt-2">
        <AccountMenu />
      </div>
    </div>
  );
}
