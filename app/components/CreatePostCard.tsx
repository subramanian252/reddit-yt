import React from "react";
import pfp from "../../public/pfp.png";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Images, Link2 } from "lucide-react";

interface Props {}

function CreatePostCard(props: Props) {
  const {} = props;

  return (
    <div>
      <Card className="p-4 flex items-center">
        <Image className="h-10 w-fit mr-2" src={pfp} alt="pfp" />
        <Link href="/r/images/create" className="w-full">
          <Input placeholder="What's on your mind?" />
        </Link>
        <div className="flex ml-2 gap-x-2">
          <Link href={"/r/images/create"}>
            <Button variant="secondary" size={"icon"}>
              <Images className=" h-4 w-4" />
            </Button>
          </Link>
          <Link href={"/r/images/create"}>
            <Button variant="secondary" size={"icon"}>
              <Link2 className=" h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default CreatePostCard;
