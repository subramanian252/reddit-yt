"use client";

import React, { useEffect } from "react";
import { updateDescription } from "../actions";
import { Textarea } from "@/components/ui/textarea";
import { SaveButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  name: string;
  description: string;
}

const initialState = {
  status: "",
  message: "",
};

function DescriptionForm(props: Props) {
  const { name, description } = props;

  const { toast } = useToast();

  const [state, formAction] = useFormState(updateDescription, initialState);

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
      <input type="hidden" name="id" value={name} />
      <Textarea
        placeholder="Add a description"
        defaultValue={description ?? ""}
        maxLength={100}
        name="description"
        className="my-2"
      />
      <SaveButton />
    </form>
  );
}

export default DescriptionForm;
