'use client';
import Navbar from "./Navbar/page";
import Catalogs from "./Catalogs/page";

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
      <Catalogs />
    </>
  );
}

