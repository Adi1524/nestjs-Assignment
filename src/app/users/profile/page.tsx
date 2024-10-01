"use client";

import axios from "axios";
import { useRouter } from "next/navigation"; // To handle routing
import { useEffect, useState } from "react";

type Profile = {
  id: number;
  userId: number;
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  username?: string; // We'll add username after fetching it
};

export default function UserProfileList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Router to handle navigation

  useEffect(() => {
    const fetchProfilesAndUsernames = async () => {
      try {
        // Fetch profiles
        const profileResponse = await axios.get(
          "http://localhost:3001/api/profiles"
        );
        const profilesData: Profile[] = profileResponse.data;

        // Fetch usernames for each profile based on userId
        const profilesWithUsernames = await Promise.all(
          profilesData.map(async (profile) => {
            const userResponse = await axios.get(
              `http://localhost:3001/api/users/${profile.userId}`
            );
            const username = userResponse.data.username;
            return { ...profile, username }; // Add username to each profile
          })
        );

        setProfiles(profilesWithUsernames);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch profiles or usernames");
        setLoading(false);
      }
    };

    fetchProfilesAndUsernames();
  }, []);

  if (loading) return <div>Loading profiles...</div>;
  if (error) return <div>{error}</div>;

  // Navigate to profile creation page
  const handleCreateProfile = () => {
    router.push("/users/profile/create");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Profiles</h1>
        <button
          onClick={handleCreateProfile}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Profile
        </button>
      </div>
      {profiles.length === 0 ? (
        <div>No profiles found.</div>
      ) : (
        <div className="mt-4 grid gap-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="p-4 border rounded shadow-md space-y-2"
            >
              <p>
                <strong>Username:</strong> {profile.username}{" "}
                {/* Display fetched username */}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
              <p>
                <strong>Pincode:</strong> {profile.pincode}
              </p>
              <p>
                <strong>City:</strong> {profile.city}
              </p>
              <p>
                <strong>State:</strong> {profile.state}
              </p>
              <p>
                <strong>Country:</strong> {profile.country}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(profile.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(profile.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
