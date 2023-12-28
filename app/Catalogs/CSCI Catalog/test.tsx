import { useEffect, useState } from 'react';

// Define the user type
type UserType = {
    id: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
};

const UserComponent = () => {
    const [users, setUsers] = useState<UserType[]>([]); // Specify the type of the state

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Update the URL based on your server setup
                const response = await fetch('/api/test');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // The return statement should be inside the component's function body
    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </div>
    );
};

export default UserComponent;
