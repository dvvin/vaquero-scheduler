'use client';
import StudentPage from "./Student/page";
import GeneratePage from "./Generate/page";
import UserLogin from "./SignIn/page";
import Homepage from "./Homepage";

export default function Home() {
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
        <Homepage />
      </main>
    </>
  );
};

