import { Bell, MessageSquareText, UserRound } from "lucide-react";
import React from "react";
import TextField from "~/components/ui/text-field";

const ProfilePage = () => {
  return (
    <main className="flex w-full h-fit justify-center py-10 ">
      <div className="flex max-w-7xl h-fit">
      <aside className="flex flex-col gap-5 w-[400px] ">
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
        <section className="flex flex-col gap-5 w-full bg-white">
            <h2 className="text-4xl font-bold">Edit Profile</h2>
            <div>
            <h4 className="text-2xl font-semibold">Perbaharui Akun</h4>
            <p className="text-lg">Kamu bisa tambahkan atau perbaharui informasi akun kamu di sini.</p>
            </div>
            <div className="flex flex-row gap-4">
                <TextField label="Nama Depan" placeholder="Ex. John"/>
                <TextField label="Nama Belakang" placeholder="Ex. Doe"/>
            </div>
            <TextField label="Email" placeholder="Ex. johndoe@gmail.com" disabled={true} />
            <TextField label="Tanggal Lahir" placeholder="date" type="date" />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
