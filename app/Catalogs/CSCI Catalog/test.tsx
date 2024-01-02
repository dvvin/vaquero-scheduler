import { useEffect, useState } from 'react';

type PostType = {
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    authorId: string;
    author: UserType | null;
};

type UserType = {
    id: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    posts: PostType[];
};


const UserComponent = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/test');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US");
    };

    return (
        <div>
            {Array.isArray(users) && users.map((user) => (
                <div key={user.id} className='text-orange-600'>
                    <p>Id: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Created At: {formatDate(user.createdAt)}</p>
                    <p>Updated At: {formatDate(user.updatedAt)}</p>
                    <div>-----------------------------</div>
                    <div>
                        <h3>Posts:</h3>
                        <ul>
                            {user.posts && user.posts.map((post) => (
                                <li key={post.id}>
                                    <p>Id: {post.id}</p>
                                    <p>Title: {post.title}</p>
                                    <p>Content: {post.content}</p>
                                    <p>Published: {post.published ? 'Yes' : 'No'}</p>
                                    <p>Author Name: {post.author?.name}</p>
                                    <p>Author ID: {post.authorId}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserComponent;
