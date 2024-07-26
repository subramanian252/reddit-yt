import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import SettingsForm from "../components/SettingsForm";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
    },
  });

  return data;
}

async function Page(props: Props) {
  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    redirect("/api/auth/login");
  }

  const data = await getData(user?.id as string);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <SettingsForm username={data?.userName} />
    </div>
  );
}

export default Page;
