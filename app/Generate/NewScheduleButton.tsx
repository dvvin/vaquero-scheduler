import { useState } from 'react';

const NewScheduleButton = ({ session, onNewScheduleClick }: {
    session: any,
    onNewScheduleClick: () => void;
}) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleDeleteSchedule = async () => {
        if (!session) {
            setErrorMessage('You must be signed in to delete a schedule.');
            return;
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_FETCH_NEW_SCHEDULE || '', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID: session?.user.studentID }),
            });

            const data = await response.json();

            console.log('Schedule Deleted:', data);
            onNewScheduleClick();
        } catch (error) {
            setErrorMessage('Error deleting schedule');
        }
    };

    return (
        <>
            <div className="flex items-center justify-center pt-28">
                <button
                    onClick={handleDeleteSchedule}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-100 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    New Schedule
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

export default NewScheduleButton;
