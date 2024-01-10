import { useState, useEffect } from "react";

interface SessionData {
    user: {
        fullName: string;
        email: string;
        id: string;
        studentID: string;
    };
    expires: string;
}

const GetSessionData = (): SessionData | null => {
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

    return session;
}

export default GetSessionData;
