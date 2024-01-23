import { useState } from 'react';
import { useDeleteSchedule } from '../GetSessionData';

const DeleteScheduleButton = ({ session, onDeleteScheduleClicked }: {
    session: any,
    onDeleteScheduleClicked: () => void;
}) => {

    const [errorMessage, setErrorMessage] = useState('');
    const deleteSchedule = useDeleteSchedule();

    const handleDeleteSchedule = async () => {
        if (!session) {
            setErrorMessage('You must be signed in to delete a schedule.');
            return;
        }

        try {
            await deleteSchedule(session.user.studentID, session.user.id);
            onDeleteScheduleClicked();
        } catch (error) {
            setErrorMessage('Error deleting schedule');
        }
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <button
                    onClick={handleDeleteSchedule}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm
                    font-medium rounded-md text-gray-100 bg-red-600 hover:bg-red-700 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    X
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

export default DeleteScheduleButton;
