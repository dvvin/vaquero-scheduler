import { useState } from 'react';

const GenerateButton = ({ session, selectedCampus, selectedClassTime, selectedDifficulty, selectedStyle }: {
    session: any, selectedCampus: any, selectedClassTime: any, selectedDifficulty: any, selectedStyle: any
}) => {

    const [errorMessage, setErrorMessage] = useState('');

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
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedOptions),
            });

            const data = await response.json();
            console.log('Schedule Generated:', data);
        } catch (error) {
            console.error('Error generating schedule:', error);
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
