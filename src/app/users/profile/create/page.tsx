"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ProfileFormData = {
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
};

export default function CreateProfileForm() {
  const { register, handleSubmit, reset } = useForm<ProfileFormData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Step 1: Check if the user exists by their email
      const userResponse = await axios.get(
        `http://localhost:3001/api/users/find-by-email/${data.email}`
      );

      if (userResponse.data) {
        // If user exists, use their ID to create the profile
        const userId = userResponse.data.id;
        await axios.post(`http://localhost:3001/api/profiles/${userId}`, data);
        reset(); // Reset the form after successful submission
        router.push("/"); // Redirect to the user profile list or any desired page
      } else {
        // If no user is found, display an error
        setError("User not found. Please enter a valid email.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Create Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Gender"
          {...register("gender", { required: true })}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Pincode"
          {...register("pincode", { required: true })}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="City"
          {...register("city", { required: true })}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="State"
          {...register("state", { required: true })}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Country"
          {...register("country", { required: true })}
          className="block w-full p-2 border"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
