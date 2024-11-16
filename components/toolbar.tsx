"use client";

import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

import { IconPicker } from "./icon-picker";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "hello",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="flex justify-between items-start -mt-8"> {/* Adjust alignment and margin */}
      <div>
        {!!initialData.icon && !preview && (
          <div className="flex items-center">
            <IconPicker onChange={onIconSelect}>
              <p>{initialData.icon}</p>
            </IconPicker>
            <Button onClick={onRemoveIcon} variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!!initialData.icon && preview && <p>{initialData.icon}</p>}
        
        {isEditing && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="mt-2" // Adjust margin here
          />
        ) : null} {/* No title or button displayed when not editing */}
      </div>
      <div className="flex gap-2 items-center"> {/* Center the buttons vertically */}
        {!initialData.icon && !preview && (
          <div className="mb-4">
            <IconPicker asChild onChange={onIconSelect}>
            <Button variant="outline" size="sm">
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
          </div>
        )}
        {!initialData.coverImage && !preview && (
          <div className="mb-4">
            <Button onClick={coverImage.onOpen} variant="outline" size="sm">
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
          </div>
        )}
      </div>
    </div>
  );
};
