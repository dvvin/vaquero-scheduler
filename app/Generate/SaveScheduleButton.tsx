import { useState } from 'react';

const SaveScheduleButton = ({ session, onScheduleSaved }: {
    session: any,
    onScheduleSaved: () => void;
}) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSaveSchedule = async () => {
        if (!session) {
            setErrorMessage('You must be signed in to save a schedule.');
            return;
        }

        try {
            console.log('Schedule Saved');
            onScheduleSaved();
        } catch (error) {
            setErrorMessage('Error saving schedule');
        }
    };

    return (
        <>
            <button
                onClick={handleSaveSchedule}
                className="inline-flex ml-10 items-center px-4 py-2 border border-transparent shadow-sm text-sm
                    font-medium rounded-md text-gray-100 bg-green-500 hover:bg-green-600 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Save Schedule
            </button>
            {errorMessage && (
                <div className="text-center my-4">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </>
    );
};

export default SaveScheduleButton;
