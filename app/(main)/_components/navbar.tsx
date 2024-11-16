"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-end fixed bottom-0 left-0 right-0">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      {/* Move this nav to the bottom right of the screen */}
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        {isCollapsed ? (
          <div className="flex items-center flex-row-reverse gap-2">
            <Title initialData={document} />
            <MenuIcon
              role="button"
              onClick={onResetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          </div>
        ) : (
          <Title initialData={document} />
        )}
      </nav>



      {/* Centering Publish and Menu at the bottom of the screen */}
      <div className="fixed bottom-4 left-[53%] flex items-center justify-center gap-x-2">
        <Publish initialData={document} />
        <Menu documentId={document._id} />
      </div>
      
      {/* Displaying banner if the document is archived */}
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

