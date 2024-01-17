import { useState, useEffect } from "react";

export interface SessionData {
    user: {
        fullName: string;
        email: string;
        id: string;
        studentID: string;
    };
    expires: string;
}

export interface StudentInfo {
    email: string;
    studentID: string;
}

export interface ScheduleData {
    StudentInfo: StudentInfo;
    campus: string;
    time: string;
    difficultyRating: string;
    teachingStyle: string;
}

export interface CourseData {
    professors: any;
    name: any;
    number: any;
}

export const useSessionData = (): SessionData | null => {
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

export const useScheduleData = (): ScheduleData[] => {
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await fetch('/api/getSchedule');
                const data: ScheduleData[] = await response.json();
                setScheduleData(data);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };
        fetchScheduleData();
    }, []);

    return scheduleData;
}

export const useCourseData = (): CourseData[] => {
    const [courseData, setCourseData] = useState<CourseData[]>([]);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch('/api/csci-catalog');
                const data: CourseData[] = await response.json();
                setCourseData(data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };
        fetchCourseData();
    }, []);

    return courseData;
}
