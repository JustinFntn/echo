import React, { useState, useEffect } from "react";
import { getVersion } from "@tauri-apps/api/app";

import ModelSelector from "../model-selector";
import UpdateChecker from "../update-checker";
import { Badge } from "@/components/ui/Badge";

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

      <div className="flex pt-3 justify-between items-center text-xs px-4 pb-3 text-text/60 border-t border-border/20" data-tauri-drag-region>
        <div className="flex items-center gap-4">
          <ModelSelector />
        </div>

        {/* Update Status */}
        <div className="flex items-center gap-1">
          <UpdateChecker />
          <Badge variant={"outline"} size={"sm"}>
          v{version}
          </Badge>
        </div>
      </div>

  );
};

export default Footer;
