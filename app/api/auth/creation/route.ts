import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went Wrong");
  }

  let dbUSer = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUSer) {
    const dbUSer = await prisma.user.create({
      data: {
        id: user.id ?? "",
        firstName: user.given_name ?? "",
        email: user.email ?? "",
        lastName: user.family_name ?? "",
        imageUrl: user.picture ?? "",
        userName: generateUsername("-", 3, 15),
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://reddit-yt-seven.vercel.app/"
  );
}
