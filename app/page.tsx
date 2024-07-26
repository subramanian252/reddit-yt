import { Card } from "@/components/ui/card";
import Image from "next/image";
import banner from "../public/banner.png";
import heroImage from "../public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePostCard from "./components/CreatePostCard";
import PostCard from "./components/PostCard";
import prisma from "./lib/db";
import { Suspense } from "react";
import SuspenseSekeleton from "./components/SuspenseSekeleton";
import Pagination from "./components/Pagination";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-5">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseSekeleton />} key={searchParams?.page}>
          <ShowCards searchparams={searchParams?.page as string} />
        </Suspense>
      </div>
      <div className="w-[35%]">
        <Card>
          <Image src={banner} alt="banner" />
          <div className="p-4">
            <div className="flex gap-x-5">
              <Image
                className="h-18 w-12  -mt-7"
                src={heroImage}
                alt="hero-image"
              />
              <h1 className="text-xl font-semibold"> Home</h1>
            </div>
            <p className="text-muted-foreground mt-4">
              Welcome to Reddit. It&apos;s great to have you here. Come here to
              Check with your Communties
            </p>
            <Separator className="my-4" />
            <div className="flex gap-y-3 flex-col">
              <Button asChild variant="secondary">
                <Link href="/r/images/create">Create Post</Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/r/create">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowCards({ searchparams }: { searchparams: string }) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.posts.count(),
    prisma.posts.findMany({
      select: {
        subName: true,
        title: true,
        id: true,
        createdAt: true,
        userId: true,
        textContent: true,
        imageString: true,
        votes: true,
        // @ts-ignore
        comments: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            userName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      skip: searchparams ? (Number(searchparams) - 1) * 5 : 0,
    }),
  ]);

  return (
    <>
      {data.map((post) => (
        // @ts-ignore
        <PostCard
          key={post.id}
          subName={post?.subName as string}
          imageString={post?.imageString as string}
          title={post?.title as string}
          // @ts-ignore
          userName={post?.User?.userName as string}
          id={post?.id as string}
          // @ts-ignore
          comments={post?.comments}
          // @ts-ignore
          voteCount={post?.votes.reduce((acc, vote) => {
            if (vote.voteType === "UP") {
              return acc + 1;
            }
            if (vote.voteType === "DOWN") {
              return acc - 1;
            }
          }, 0)}
        />
      ))}
      <Pagination totalPages={Math.ceil(count / 5)} />
    </>
  );
}
