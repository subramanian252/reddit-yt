"use client";

import { toast, useToast } from "@/components/ui/use-toast";
import { Share } from "lucide-react";
import React from "react";

interface Props {
  id: string;
}

function ShareIcon(props: Props) {
  const { id } = props;

  const { toast } = useToast();

  const shareFeature = async () => {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
    toast({
      title: "Success",
      description: "Copied to clipboard",
    });
  };

  return (
    <div className="flex gap-x-1 cursor-pointer" onClick={shareFeature}>
      <Share className="w-4 h-4" />
      <p className="text-sm text-muted-foreground">Share</p>
    </div>
  );
}

export default ShareIcon;
