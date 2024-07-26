"use client";

import { Button } from "@/components/ui/button";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Menubar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-x-5 mt-3">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
      >
        H1
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
      >
        H2
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
      >
        H3
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
      >
        strike
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
      >
        bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
      >
        italic
      </Button>
    </div>
  );
};
const Tiptap = ({
  json,
  setJson,
}: {
  json: JSONContent | null;
  setJson: any;
}) => {
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setJson(json);
    },
    extensions: [StarterKit],
    content: json ?? "",
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
  });

  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent
        className="rounded-lg min-h-[150px] p-4 border mt-2"
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;
