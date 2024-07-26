import PostCard from "@/app/components/PostCard";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CakeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    id: string;
  };
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const data = await prisma.posts.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      textContent: true,
      imageString: true,
      createdAt: true,
      Subreddit: {
        select: {
          name: true,
          description: true,
        },
      },
      votes: {
        select: {
          voteType: true,
        },
      },
      // @ts-ignore
      comments: {
        select: {
          id: true,
          textContent: true,
          createdAt: true,
          User: {
            select: {
              userName: true,
              id: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10">
      <div className="w-[65%]">
        <div>
          {/* @ts-ignore */}
          <PostCard
            // @ts-ignore
            subName={data?.Subreddit?.name}
            // @ts-ignore
            userName={data?.User?.userName}
            // @ts-ignore
            voteCount={data?.votes.reduce((acc, vote) => {
              if (vote.voteType === "UP") {
                return acc + 1;
              }
              if (vote.voteType === "DOWN") {
                return acc - 1;
              }
            }, 0)}
            {...data}
            textContentShow={true}
          />
        </div>
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="p-4 bg-muted font-semibold">About Community</div>
          <Separator />
          <div className="p-4">
            <div className=" flex items-center gap-x-4">
              <Image
                // @ts-ignore
                src={`https://avatar.vercel.sh/${data.Subreddit?.name}`}
                alt="reddit logo"
                width={75}
                height={75}
                className="rounded-full"
              />
              <Link className="font-semibold text-lg" href={`/r/${params.id}`}>
                {/* @ts-ignore */}
                {data?.Subreddit?.name}
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm font-normal text-muted-foreground">
                {/* @ts-ignore */}
                {data?.Subreddit?.description}
              </p>

              <div className="mt-4 items-center flex gap-x-1">
                <CakeIcon className="w-4 h-4" />
                <p className="text-muted-foreground">
                  Created:{" "}
                  {new Date(data?.createdAt).toLocaleString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Separator className="my-4" />
              <Button asChild className="w-full" variant={"default"}>
                <Link href={`/r/${params.id}/create`}>Create Post </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;
