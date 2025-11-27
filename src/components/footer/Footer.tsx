import { getVersion } from "@tauri-apps/api/app";
import type React from "react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import ModelSelector from "../model-selector";
import UpdateChecker from "../update-checker";

const Footer: React.FC = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const appVersion = await getVersion();
        setVersion(appVersion);
      } catch (error) {
        console.error("Failed to get app version:", error);
        setVersion("0.1.2");
      }
    };

    fetchVersion();
  }, []);

  return (
    <div
      className="flex items-center justify-between border-border/20 border-t px-4 pt-3 pb-3 text-text/60 text-xs"
      data-tauri-drag-region
    >
      <div className="flex items-center gap-4">
        <ModelSelector />
      </div>

      {/* Update Status */}
      <div className="flex items-center gap-1">
        <UpdateChecker />
        <Badge size={"sm"} variant={"outline"}>
          v{version}
        </Badge>
      </div>
    </div>
  );
};

export default Footer;
