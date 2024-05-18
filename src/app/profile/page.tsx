"use client";
import { Bell, MessageSquareText, UserRound } from "lucide-react";
import React, { useState } from "react";
import TextField from "~/components/ui/text-field";

const ProfilePage = () => {
  const [gender, setGender] = useState("");

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  return (
    <main className="flex h-screen  w-full justify-center py-10 ">
      <div className="flex h-fit max-w-7xl">
        <aside className="flex w-[400px] flex-col gap-5 ">
          <div className="flex items-center gap-4">
            <UserRound className="h-8 w-8 text-primary" />
            <p className="font-semibold">Akun saya</p>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-8 w-8 text-primary" />
            <p className="font-semibold">Notifikasi</p>
          </div>
          <div className="flex items-center gap-4">
            <MessageSquareText className="h-8 w-8 text-primary" />
            <p className="font-semibold">Pesanan saya</p>
          </div>
        </aside>
        <section className="flex w-full flex-col gap-5 bg-white">
          <h2 className="text-4xl font-bold">Edit Profile</h2>
          <div className="mt-6">
            <h4 className="text-2xl font-semibold">Perbaharui Akun</h4>
            <p className="text-lg">
              Kamu bisa tambahkan atau perbaharui informasi akun kamu di sini.
            </p>
          </div>
          <div className="mt-10 flex flex-row gap-4">
            <TextField label="Nama Depan" placeholder="Ex. John" />
            <TextField label="Nama Belakang" placeholder="Ex. Doe" />
          </div>
          <TextField
            label="Email"
            placeholder="Ex. johndoe@gmail.com"
            disabled={true}
          />
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <TextField label="Tanggal Lahir" placeholder="date" type="date" />
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <label className="text-lg font-medium">Jenis Kelamin</label>
              <div className="flex gap-6 items-center h-10">
                <label className="text-base">
                  <input
                    type="radio"
                    className="radio-input mr-2 accent-primary"
                    value={"male"}
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                  />
                  Laki-laki
                </label>
                <label className="text-base">
                  <input
                    type="radio"
                    className="radio-input mr-2 accent-primary"
                    value={"female"}
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                  />
                  Perempuan
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
