"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  realTimeContent?: string;  // Prop for real-time updates
}

const Editor = ({ onChange, initialContent, editable, realTimeContent }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  
  const [currentContent, setCurrentContent] = useState<string | undefined>(initialContent);

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  // Sync the real-time content when it's available
  useEffect(() => {
    if (realTimeContent) {
      setCurrentContent(realTimeContent);
    }
  }, [realTimeContent]);

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: currentContent
      ? (JSON.parse(currentContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      const updatedContent = JSON.stringify(editor.topLevelBlocks, null, 2);
      setCurrentContent(updatedContent); // Update the local state
      onChange(updatedContent); // Notify the parent about the content change
    },
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
