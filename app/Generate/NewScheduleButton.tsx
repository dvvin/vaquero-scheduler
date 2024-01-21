import { useState } from 'react';
import { useDeleteSchedule } from '../GetSessionData'; // Import the new hook
import SaveScheduleButton from './SaveScheduleButton';

const NewScheduleButton = ({ session, onNewScheduleClick, onScheduleSaved }: {
    session: any,
    onNewScheduleClick: () => void;
    onScheduleSaved: () => void;
}) => {

    const [errorMessage, setErrorMessage] = useState('');
    const deleteSchedule = useDeleteSchedule();

    const handleDeleteSchedule = async () => {
        if (!session) {
            setErrorMessage('You must be signed in to delete a schedule.');
            return;
        }

        try {
            await deleteSchedule(session.user.studentID);
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
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm
                    font-medium rounded-md text-gray-100 bg-blue-600 hover:bg-blue-700 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    New Schedule
                </button>
                <SaveScheduleButton session={session} onScheduleSaved={onScheduleSaved} />
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
