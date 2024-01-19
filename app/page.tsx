'use client';
import StudentPage from "./Student/page";
import GeneratePage from "./Generate/page";
import UserLogin from "./SignIn/page";

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
      <GeneratePage />
    </>
  );
}

