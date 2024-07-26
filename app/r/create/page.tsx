"use client";

import SubmitButton from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { createSubReddit } from "../../actions";

interface Props {}

const initialState = {
  status: "",
  message: "",
};

function Page(props: Props) {
  const {} = props;

  const { toast } = useToast();

  const [state, formAction] = useFormState(createSubReddit, initialState);

  useEffect(() => {
    if (state?.status === "fail") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state?.message,
      });
    }
  }, [toast, state]);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col">
      <form action={formAction}>
        <h1 className="text-3xl font-extrabold tracking-tighter">
          Create Community
        </h1>
        <Separator className="my-4" />
        <Label className="text-xl font-semibold">Name</Label>
        <p className="text-muted-foreground">
          Community names cannot be changed
        </p>

        <div className="mt-3 relative">
          <p className="absolute left-0 w-8 h-full flex items-center justify-center">
            r/
          </p>
          <Input
            type="text"
            required
            minLength={3}
            maxLength={20}
            name="name"
            className=" pl-6"
          />
        </div>

        <div className="justify-end flex gap-x-4 mt-6">
          <Button asChild variant={"secondary"}>
            <Link href={"/"}>Cancel</Link>
          </Button>
          <SubmitButton text="Create Community" />
        </div>
      </form>
    </div>
  );
}

export default Page;
