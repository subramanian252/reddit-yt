"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useEffect } from "react";
import { updateUserName } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButtons";

interface Props {
  username: string | null | undefined;
}

const initialState = {
  status: "",
  message: "",
};

function SettingsForm(props: Props) {
  const { username } = props;

  const [state, formAction] = useFormState(updateUserName, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "success") {
      toast({
        title: "Success",
        description: state?.message,
      });
    }

    if (state?.status === "fail") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state?.message,
      });
    }
  }, [toast, state]);

  return (
    <form action={formAction}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      <Separator className="my-4" />
      <Label className="text-xl font-semibold">Username</Label>
      <p className="text-muted-foreground">Change your username</p>
      <Input
        type="text"
        name="username"
        className="mt-2"
        min={3}
        max={20}
        defaultValue={username ?? ""}
      />
      <div className="mt-8 flex justify-end  gap-x-4">
        <Button asChild variant={"secondary"}>
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButton text="Update" />
      </div>
    </form>
  );
}

export default SettingsForm;
