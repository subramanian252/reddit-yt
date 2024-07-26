import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%]">
        <Skeleton className=" h-[1000px] w-full" />
      </div>
      <div className="w-[35%]">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );
}

export default Loading;
