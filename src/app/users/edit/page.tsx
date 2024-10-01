"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

export default function ProfileForm({ params }: { params?: { id?: string } }) {
  const { register, handleSubmit, reset } = useForm<ProfileFormData>();
  const router = useRouter();
  const isEditMode = params?.id;

  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`http://localhost:3001/api/users/${params.id}/profile`)
        .then((res) => {
          reset(res.data);
        });
    }
  }, [isEditMode]);

  const onSubmit = async (data: ProfileFormData) => {
    if (isEditMode) {
      await axios.put(
        `http://localhost:3001/api/users/profile/${params.id}`,
        data
      );
    } else {
      await axios.post(`http://localhost:3001/api/users/profile`, data);
    }
    router.push(`http://localhost:3001/users/${params?.id}/profile`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        {isEditMode ? "Edit" : "Create"} Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Gender"
          {...register("gender")}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Address"
          {...register("address")}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Pincode"
          {...register("pincode")}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="City"
          {...register("city")}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="State"
          {...register("state")}
          className="block w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Country"
          {...register("country")}
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
