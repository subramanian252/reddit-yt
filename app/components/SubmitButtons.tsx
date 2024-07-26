"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

function SubmitButton(props: { text: string }) {
  const { text } = props;

  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button type="submit">{text}</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}

export function UpVoteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button size="icon" type="submit" variant={"outline"}>
          <ArrowUp />
        </Button>
      ) : (
        <Button disabled>
          <Loader2 className=" h-4 w-4 animate-spin" />
        </Button>
      )}
    </>
  );
}

export function DownVoteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button size="icon" type="submit" variant={"outline"}>
          <ArrowDown />
        </Button>
      ) : (
        <Button disabled>
          <Loader2 className=" h-4 w-4 animate-spin" />
        </Button>
      )}
    </>
  );
}

export function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button size="sm" className="w-full mt-2" type="submit">
          Save
        </Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 mt-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}

export default SubmitButton;
