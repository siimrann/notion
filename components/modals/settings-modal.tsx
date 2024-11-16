"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Shield, ArrowLeft, User, Settings as SettingsIcon } from "lucide-react"; // Correctly import the Settings icon

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2>My settings</h2>
          <hr className="my-2 border-t border-muted-foreground" />
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Appearance Setting */}
          <div className="flex items-center justify-between gap-x-4  p-2 rounded-md">
            <div className="flex items-center gap-2">
              <SettingsIcon size={20} />
              <div className="flex flex-col">
                <Label>Appearance</Label>
                <span className="text-muted-foreground text-sm">Customize how Journalize looks on your device</span>
              </div>
            </div>
            <ModeToggle />
          </div>

          {/* Privacy & Security */}
          <div className="flex items-center justify-between gap-x-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 cursor-pointer p-2 rounded-md">
            <div className="flex items-center gap-2">
              <Shield size={20} />
              <div className="flex flex-col">
                <Label>Privacy & Security</Label>
                <span className="text-muted-foreground text-sm">Manage your security preferences</span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="flex items-center justify-between gap-x-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 cursor-pointer p-2 rounded-md">
            <div className="flex items-center gap-2">
              <User size={20} />
              <div className="flex flex-col">
                <Label>Account Settings</Label>
                <span className="text-muted-foreground text-sm">Edit account details</span>
              </div>
            </div>
          </div>

          {/* Back to Unimanage */}
          <div className="flex items-center justify-between gap-x-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 cursor-pointer p-2 rounded-md">
            <div className="flex items-center gap-2">
              <ArrowLeft size={20} />
              <div className="flex flex-col">
                <Label>Back to Unimanage</Label>
                <span className="text-muted-foreground text-sm">Return to the main dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
