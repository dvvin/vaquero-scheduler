import { useEffect } from 'react';
import { useState } from 'react';

interface SessionData {
    user: {
        id: string;
        fullName: string;
        email: string;
        studentID: string;
        classification: string;
    };
    expires: string;
}

const StudentInfo: React.FC = () => {
    const [session, setSession] = useState<SessionData | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch('/api/auth/session');

            const data: SessionData = await res.json();

            if (data && data.user && data.user.email) {
                setSession(data);
            } else {
                setSession(null);
            }
        };

        fetchSession();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 font-sans">
            <div className="max-w-4xl bg-white w-full rounded-lg shadow-xl">
                <div className="p-4 border-b">
                    <h2 className="text-2xl text-gray-800">Student Information</h2>
                    <p className="text-sm text-gray-500">Personal details and information.</p>
                </div>

                <div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-800 text-sm font-semibold">Full name</p>
                        <p className="text-gray-800 text-sm font-semibold">{session?.user.fullName}</p>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-800 text-sm font-semibold">Student ID:</p>
                        <p className="text-gray-800 text-sm font-semibold">{session?.user.studentID}</p>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-800 text-sm font-semibold">Email Address:</p>
                        <p className="text-gray-800 text-sm font-semibold"> {session?.user.email}</p>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-800 text-sm font-semibold">Classification:</p>
                        <p className="text-gray-800 text-sm font-semibold">{session?.user.classification}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;
