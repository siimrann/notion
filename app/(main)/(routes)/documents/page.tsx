"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      {/* Welcome message and button aligned in a row */}
      <div className="flex items-center justify-between w-full max-w-4xl px-4 -mt-4">
        <h2 className="-ml-20">
          Welcome to <span className="font-bold">{user?.firstName}&apos;s</span> Journalize
        </h2>
        <Button onClick={onCreate} className="ml-auto -mr-20">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create a note
        </Button>
      </div>

      {/* Motivational Lines */}
      <div className="mt-28 space-y-4 text-center w-full max-w-4xl px-4">
        <p className="max-w-[90%] mx-auto text-gray-600 dark:text-gray-400">
          🌟 Transform chaos into clarity with Journalize, where you can organize your thoughts, tasks, and projects all in one intuitive workspace!
        </p>
        <p className="max-w-[90%] mx-auto text-gray-600 dark:text-gray-400">
          🎨 Unlock your creativity by building a personalized dashboard in Journalize—your ideas deserve a space that inspires!
        </p>
        <p className="max-w-[90%] mx-auto text-gray-600 dark:text-gray-400">
          🎯 Journalize empowers you to turn your ambitions into achievable goals—create your roadmap to success today!
        </p>
        <p className="max-w-[90%] mx-auto text-gray-600 dark:text-gray-400 ">
          🌈 Dive into a world of endless possibilities with Journalize, where every note, document, and project can be tailored to your unique workflow!
        </p>
        <p className="max-w-[90%] mx-auto text-gray-600 dark:text-gray-400">
          ✏️ With Journalize, you have the ultimate canvas to visualize your plans—don’t just dream it, document it!
        </p>
        
      </div>
      <div className="mt-16 space-y-4 text-center w-full max-w-4xl px-4">
        <p className="max-w-[90%] mx-auto text-gray-600 dark:text-gray-400 -mb-2">
          Get started by
        </p>

        {/* Centering the button */}
        <div className="flex flex-col items-center">
          <Button onClick={onCreate} className="text-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            Creating a note
          </Button>
          
          {/* Adding styled Journalize text below the button */}
          <p className="text-gray-600 dark:text-gray-950 mt-14 text-1xl font-semibold">
            Journalize
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
