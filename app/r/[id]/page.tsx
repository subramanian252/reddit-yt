import { updateDescription } from "@/app/actions";
import CreatePostCard from "@/app/components/CreatePostCard";
import DescriptionForm from "@/app/components/DescriptionForm";
import Pagination from "@/app/components/Pagination";
import PostCard from "@/app/components/PostCard";
import { SaveButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TypeOfVote } from "@prisma/client";
import { CakeIcon, FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    id: string;
    searchParams: {
      page: string;
    };
  };
}

async function Page(props: Props) {
  noStore();
  // @ts-ignore
  const { params, searchParams } = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const [count, data] = await prisma.$transaction([
    prisma.posts.count({
      where: {
        subName: params.id,
      },
    }),

    prisma.subreddit.findUnique({
      where: {
        name: params.id,
      },

      select: {
        name: true,
        description: true,
        userId: true,
        createdAt: true,
        id: true,
        posts: {
          take: 5,
          skip: searchParams.page ? (Number(searchParams.page) - 1) * 5 : 0,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            textContent: true,
            imageString: true,
            subName: true,
            // @ts-ignore
            comments: {
              select: {
                id: true,
              },
            },
            votes: {
              select: {
                voteType: true,
              },
            },
            User: {
              select: {
                userName: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        {/* @ts-ignore */}
        {data?.posts.length === 0 ? (
          <div className="min-h-[400px] flex flex-col justify-center items-center gap-y-5">
            <div className="w-20 h-20 flex items-center justify-center bg-primary/10 rounded-full">
              <FileQuestion className="w-14 h-14 font-semibold text-primary " />
            </div>
            <p className="text-muted-foreground text-xl font-semibold">
              No posts yet
            </p>
          </div>
        ) : (
          // @ts-ignore
          data?.posts.map((post) => (
            <PostCard
              key={post.id}
              subName={post.subName}
              title={post.title}
              textContent={post.textContent as string}
              imageString={post.imageString}
              // @ts-ignore
              userName={post?.User?.userName}
              id={post.id}
              comments={post?.comments}
              voteCount={
                // @ts-ignore
                post?.votes.reduce((acc: number, vote: number) => {
                  // @ts-ignore
                  if (vote.voteType === "UP") {
                    return acc + 1;
                  }
                  // @ts-ignore
                  if (vote.voteType === "DOWN") {
                    return acc - 1;
                  }
                }, 0) as TypeOfVote
              }
            />
          ))
        )}
        {count > 0 && <Pagination totalPages={Math.ceil(count / 5)} />}
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="p-4 bg-muted font-semibold">About Community</div>
          <Separator />
          <div className="p-4">
            <div className=" flex items-center gap-x-4">
              <Image
                src={`https://avatar.vercel.sh/${params.id}`}
                alt="reddit logo"
                width={75}
                height={75}
                className="rounded-full"
              />
              <Link className="font-semibold text-lg" href={`/r/${params.id}`}>
                {`r/${params.id}`}
              </Link>
            </div>
            <div className="mt-4">
              {user?.id === data?.userId ? (
                <DescriptionForm
                  // @ts-ignore
                  name={data?.name}
                  // @ts-ignore
                  description={data?.description}
                />
              ) : (
                <p className="text-sm font-normal text-muted-foreground">
                  {data?.description}
                </p>
              )}
              <div className="mt-4 items-center flex gap-x-1">
                <CakeIcon className="w-4 h-4" />
                <p className="text-muted-foreground">
                  Created: {/* @ts-ignore */}
                  {new Date(data?.createdAt).toLocaleString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <Separator className="my-4" />
              <Button asChild className="w-full" variant={"secondary"}>
                <Link
                  href={user?.id ? `/r/${params.id}/create` : "/api/auth/login"}
                >
                  Create Post
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;
