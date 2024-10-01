"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  phone: string;
};

export default function UserForm({ params }: { params?: { id?: string } }) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const router = useRouter();
  const isEditMode = params?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      if (isEditMode) {
        try {
          // Fetch user data for edit mode
          const response = await axios.get(
            `http://localhost:3001/api/users/${params.id}`
          );
          reset(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [isEditMode, params?.id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:3001/api/users/${params.id}`, data);
      } else {
        await axios.post("http://localhost:3001/api/users", data);
      }
      router.push("/users");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        {isEditMode ? "Edit" : "Create"} User
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Phone"
          {...register("phone")}
          className="block w-full p-2 border"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
