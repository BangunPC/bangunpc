"use client";
import { Bell, MessageSquareText, UserRound } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/text-field";

const ProfilePage = () => {
  return (
    <main className="flex h-screen w-full justify-center py-10 ">
      <div className="flex h-fit max-w-7xl">
        <aside className="flex flex-col gap-5 px-4 md:w-[400px] ">
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-4"
          >
            <UserRound className="h-8 w-8 text-primary " />
            <p className="hidden font-semibold md:block">Akun </p>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-4"
          >
            <Bell className="h-8 w-8 text-primary" />
            <p className="hidden font-semibold md:block">Notifikasi</p>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-4"
          >
            <MessageSquareText className="h-8 w-8 text-primary" />
            <p className="hidden font-semibold md:block">Pesanan saya</p>
          </Button>
        </aside>
        <section className="flex w-full flex-col gap-5 pl-2 pr-4">
          <h2 className="text-4xl font-bold">Ubah Profil</h2>
          <div className="mt-0 md:mt-6">
            <h4 className="text-2xl font-semibold">Perbaharui Akun</h4>
            <p className="text-lg">
              Kamu bisa tambahkan atau perbaharui informasi akun kamu di sini.
            </p>
          </div>
          <div className=" mt-4 flex flex-col gap-4 md:mt-10 md:flex-row ">
            <TextField label="Nama" placeholder="Ex: John" />
          </div>
          <TextField
            label="Email"
            placeholder="Ex: johndoe@gmail.com"
            disabled={true}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 ">
            <div className="col-span-3">
              <TextField label="Tanggal Lahir" placeholder="date" type="date" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
