"use client";

import React from "react";
import { addComments } from "../actions";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./SubmitButtons";

interface Props {
  id: string;
}

function CommentForm(props: Props) {
  const { id } = props;

  const ref = React.useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formdata) => {
        await addComments(formdata);
        ref.current?.reset();
      }}
      className="flex flex-col gap-y-3 "
    >
      <Textarea
        placeholder="what are your thoughts"
        className="w-full"
        required
        name="comment"
        minLength={3}
        maxLength={100}
      />
      <input type="hidden" name="postId" value={id} />
      <SubmitButton text="Comment" />
    </form>
  );
}

export default CommentForm;
