"use client";

import { ChevronsLeftRight, HelpCircle, Settings, LogOut } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/hooks/use-settings";

export const UserItem = () => {
  const { user } = useUser();
  const settings = useSettings();

  const getInitials = (fullName: string | null | undefined): string => {
    if (!fullName) return "";
    const names = fullName.split(" ");
    const initials = names.map(name => name.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const initials = getInitials(user?.fullName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex items-center mt-4 mb-4">
          <Avatar className="h-5 w-5 ml-2">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="ml-4 font-bold">{initials}&apos;s Journalize</span>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex items-center">
          <Avatar className="ml-2">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <div className="ml-4">
            <p className="font-medium">{user?.fullName}</p> {/* Full name */}
            <p className="text-sm text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p> {/* Email ID in light color */}
          </div>
        </div>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={settings.onOpen}
          className="w-full cursor-pointer text-muted-foreground flex items-center"
        >
          <Settings className="mr-2 h-4 w-4" /> Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => console.log("Open Help")}
          className="w-full cursor-pointer text-muted-foreground flex items-center"
        >
          <HelpCircle className="mr-2 h-4 w-4" /> Help
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground flex items-center"
        >
          <SignOutButton>
            <div className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
