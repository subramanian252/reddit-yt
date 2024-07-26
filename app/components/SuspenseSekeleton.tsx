import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function SuspenseSekeleton(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col gap-y-5">
      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[400px] w-full" />

      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
}

export default SuspenseSekeleton;
