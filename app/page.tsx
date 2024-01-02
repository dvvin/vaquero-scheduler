'use client';
import Navbar from "./Navbar/Navbar";
import StudentInfo from "./Student/StudentInfo";
import UserSelections from "./Catalogs/UserSelections";
import Catalogs from "./Catalogs/page";
import UserComponent from './Catalogs/CSCI Catalog/test';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
        <Catalogs />
      </main>
    </>
  );
}

