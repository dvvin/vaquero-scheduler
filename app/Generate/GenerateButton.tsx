import { useState } from 'react';
import { useGenerateSchedule } from '../GetSessionData';

const GenerateButton = ({ session, selectedCampus, selectedClassTime, selectedDifficulty, selectedStyle, onScheduleGenerated }: {
    session: any,
    selectedCampus: string | null,
    selectedClassTime: string | null,
    selectedDifficulty: string | null,
    selectedStyle: string | null,
    onScheduleGenerated: () => void;

}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const generateSchedule = useGenerateSchedule();

    const handleGenerateSchedule = async () => {
        if (!session) {
            setErrorMessage('You must be signed in to generate a schedule.');
            return;
        }

        const selectedOptions = {
            campus: selectedCampus,
            time: selectedClassTime,
            difficultyRating: selectedDifficulty,
            teachingStyle: selectedStyle,
            studentInfo: {
                fullName: session?.user.fullName,
                email: session?.user.email,
                id: session?.user.id,
                studentID: session?.user.studentID,
            },
        };

        try {
            const data = await generateSchedule(selectedOptions);
            console.log('Schedule Generated:', data);
            onScheduleGenerated();
        } catch (error) {
            setErrorMessage('Error generating schedule');
        }
    };

    return (
        <>
            <div className="flex items-center justify-center pt-10">
                <button
                    onClick={handleGenerateSchedule}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-100 bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Generate Schedule
                </button>
            </div>
            {errorMessage && (
                <div className="text-center my-4">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </>
    );
};

export default GenerateButton;
