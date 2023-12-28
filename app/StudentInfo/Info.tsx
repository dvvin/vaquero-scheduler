import React from 'react';

interface UserInfo {
    name: string;
    id: string;
    email: string;
    classification: string;
}

const StudentInfo: React.FC = () => {
    const userInfo: UserInfo = { // hardcode user info for now
        name: "John Doe",
        id: "123456",
        email: "john.doe@example.com",
        classification: "Senior"
    };

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
                        <p className="text-gray-800 text-sm font-semibold">{userInfo.name}</p>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-800 text-sm font-semibold">Student ID:</p>
                        <p className="text-gray-800 text-sm font-semibold">{userInfo.id}</p>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-800 text-sm font-semibold">Email Address:</p>
                        <p className="text-gray-800 text-sm font-semibold">{userInfo.email}</p>
                    </div>

                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-800 text-sm font-semibold">Classification:</p>
                        <p className="text-gray-800 text-sm font-semibold">{userInfo.classification}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;
