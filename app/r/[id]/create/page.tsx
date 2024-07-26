"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import pfp from "@/public/pfp.png";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Images, Text } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tiptap from "@/app/components/TiptapEditor";
import SubmitButton from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@uploadthing/react";
import { JSONContent } from "@tiptap/react";
import { uploadPost } from "@/app/actions";

interface Props {
  params: {
    id: string;
  };
}

const guidelines = [
  {
    id: 1,
    text: "remember the human",
  },
  {
    id: 2,
    text: "Behave like you are in real Life",
  },
  {
    id: 3,
    text: "Look for Original Source",
  },
  {
    id: 4,
    text: "Search for Duplication before posting",
  },
  {
    id: 5,
    text: "read the community guidlines",
  },
];

function Page(props: Props) {
  const { params } = props;

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const [json, setJson] = React.useState<JSONContent | null>(null);

  const [title, setTitle] = React.useState<string | null>(null);

  const formAction = uploadPost.bind(null, { jsonContent: json });

  console.log(params.id);

  return (
    <div className="w-[1000px] mx-auto flex mt-4 gap-x-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1 className="text-xl font-bold">
          SubReddit{" "}
          <Link href={"/r/" + params.id} className="text-primary">
            {params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="post">
              <Text className="mr-2 h-4 w-4" />
              Post
            </TabsTrigger>
            <TabsTrigger value="images">
              <Images className="mr-2 h-4 w-4" />
              Images
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card className="w-full ">
              <form action={formAction}>
                <CardHeader>
                  <Label className="text-xl font-bold mb-2">Title</Label>
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title ?? undefined}
                    required
                    className="mb-2"
                    placeholder="Title"
                    name="title"
                  />
                  <input
                    type="hidden"
                    name="imageUrl"
                    value={imageUrl ?? undefined}
                  />

                  <input
                    type="hidden"
                    name="subName"
                    value={params.id ?? undefined}
                  />
                  <Tiptap json={json} setJson={setJson} />
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="images">
            <Card>
              <CardHeader>
                {!imageUrl ? (
                  // @ts-ignore
                  <UploadDropzone
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary
                  ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                    endpoint="imageUploader"
                    onUploadError={(e: Error) => {
                      alert("Upload Failed");
                    }}
                    onClientUploadComplete={(res: any) => {
                      setImageUrl(res[0].url);
                    }}
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    width={400}
                    height={300}
                    alt="image"
                    className="w-full h-full object-fit"
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[35%]">
        <Card className="w-full p-4">
          <div className="flex items-center gap-x-2">
            <Image src={pfp} alt="pfp" className="h-14 w-14" />
            <h1 className="font-semibold text-lg">Create Community post</h1>
          </div>
          <Separator className="my-4" />

          <div className="flex flex-col space-y-4">
            {guidelines.map((guide) => (
              <div key={guide.id}>
                <p className="text-sm font-medium lowercase">
                  {guide.id}. {guide.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;
