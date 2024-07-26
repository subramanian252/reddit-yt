"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";

export async function updateUserName(prev: any, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/api/auth/login");
  }

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: formData.get("username") as string,
      },
    });

    return { status: "success", message: "Username updated successfully" };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { status: "fail", message: "Username already exists" };
      }
    }
    throw err;
  }
}

export async function createSubReddit(prev: any, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/api/auth/login");
  }

  try {
    const data = await prisma.subreddit.create({
      data: {
        name: formData.get("name") as string,
        userId: user.id,
      },
    });

    return redirect(`/r/${data.name}`);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { status: "fail", message: "Username already exists" };
      }
    }

    throw err;
  }
}

export async function updateDescription(prev: any, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/api/auth/login");
  }

  try {
    const data = await prisma.subreddit.update({
      where: {
        name: formData.get("id") as string,
      },
      data: {
        description: formData.get("description") as string,
      },
    });

    return { status: "success", message: "Description updated successfully" };
  } catch (err) {
    return { status: "fail", message: "Something went Wrong" };
  }
}

export async function uploadPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/api/auth/login");
  }

  const post = await prisma.posts.create({
    data: {
      title: formData.get("title") as string,
      imageString: formData.get("imageUrl") as string,
      textContent: jsonContent ?? undefined,
      subName: formData.get("subName") as string,
      userId: user.id,
    },
  });
  return redirect(`/post/${post.id}`);
}

export async function castVote(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/api/auth/login");
  }

  const vote = await prisma.vote.findFirst({
    where: {
      userId: user.id,
      postId: formData.get("postId") as string,
    },
  });

  if (vote) {
    if (vote.voteType === (formData.get("voteType") as string)) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });
      return revalidatePath("/");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: formData.get("voteType") as TypeOfVote,
        },
      });
      return revalidatePath("/");
    }
  }

  await prisma.vote.create({
    data: {
      userId: user.id,
      postId: formData.get("postId") as string,
      voteType: formData.get("voteType") as TypeOfVote,
    },
  });
  return revalidatePath("/");
}

export async function addComments(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/api/auth/login");
  }

  const textContent = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  const data = await prisma.comment.create({
    data: {
      textContent,
      userId: user.id,
      postId,
    },
  });

  return revalidatePath(`/post/${postId}`);
}
