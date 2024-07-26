import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import ShareIcon from "./ShareIcon";
import SubmitButton, { DownVoteButton, UpVoteButton } from "./SubmitButtons";
import { addComments, castVote } from "../actions";
import { RenderToJson } from "./RenderToJson";
import Link from "next/link";
import { TypeOfVote } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import CommentForm from "./CommentForm";

interface Props {
  subName: string | null;
  title: string;

  imageString: string | null;
  userName: string | undefined;
  id: string;

  voteCount: TypeOfVote | unknown;

  textContent: string | null;
  textContentShow?: boolean;
  comments?: any[] | undefined;
}

function PostCard(props: Props) {
  const {
    subName,
    textContentShow,
    title,
    textContent = false,
    imageString,
    userName,
    id,
    voteCount,
    comments,
  } = props;

  return (
    <Card className="flex w-full">
      <div className="p-4 bg-muted flex flex-col gap-y-3 items-center ">
        <form action={castVote}>
          <input type="hidden" name="voteType" value={"UP"} />
          <input type="hidden" name="postId" value={id} />
          <UpVoteButton />
        </form>
        {/* @ts-ignore */}
        <h1>{voteCount}</h1>
        <form action={castVote}>
          <input type="hidden" name="voteType" value={"DOWN"} />
          <input type="hidden" name="postId" value={id} />
          <DownVoteButton />
        </form>
      </div>

      <div className="p-4 flex-1">
        <div className="flex gap-x-5 items-center mb-2">
          <Link href={`/r/${subName}`} className="text-sm font-semibold">
            r/{subName}
          </Link>
          <h1 className="text-sm text-muted-foreground font-medium">
            posted by r/{userName}
          </h1>
        </div>
        <Link href={`/post/${id}`} className="text-lg  font-semibold">
          {title}
        </Link>
        {imageString ? (
          <Image
            src={imageString}
            alt="banner"
            width={500}
            height={300}
            className="w-full object-fit overflow-hidden max-h-[300px]"
          />
        ) : textContent && !textContentShow ? (
          <RenderToJson data={textContent} />
        ) : null}
        {textContent && textContentShow ? (
          <RenderToJson data={textContent} />
        ) : null}
        <div className="mt-3 flex gap-x-3">
          <div className="flex gap-x-1">
            <MessageCircle className="w-4 h-4" />
            <p className="text-sm text-muted-foreground">
              {comments?.length || 0} Comments
            </p>
          </div>
          <ShareIcon id={id} />
        </div>
        {textContentShow && (
          <div className="mt-4 w-full">
            <CommentForm id={id} />
            <div>
              <p className=" text-muted-foreground my-2">Comments</p>
              <div className="flex flex-col gap-y-4">
                {comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-x-3 items-center">
                    <Image
                      src={comment.User.imageUrl}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="rounded-full w-08 h-08 object-cover"
                    />
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-sm font-medium text-muted-foreground">
                        {comment.User.userName}
                      </h1>
                      <p className="text-base">{comment.textContent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default PostCard;
