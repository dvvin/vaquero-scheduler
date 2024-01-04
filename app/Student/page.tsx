'use client';
import StudentInfo from "./StudentInfo";
import Navbar from "../Navbar/page";

const StudentPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
                <StudentInfo />
            </main>
        </>
    );
}

export default StudentPage;
