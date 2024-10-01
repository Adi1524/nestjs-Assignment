"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  phone: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]); // Explicitly define the type of users

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users") // Fetch all users from backend
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/api/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <Link href="/users/create">
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Create User
        </button>
      </Link>
      <ul className="mt-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>
              {user.username} - {user.phone}
            </span>
            <div>
              <Link href={`/users/profile`}>
                <button className="mr-2 px-4 py-1 bg-blue-500 text-white rounded">
                  View Profile
                </button>
              </Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
