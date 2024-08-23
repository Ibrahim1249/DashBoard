import React from "react";

import { XCircle } from "lucide-react";
import { Button } from "./ui/button";

const Widget = ({ widget, onRemove }) => {
  return (
    <div className="bg-muted p-4 rounded-lg w-[25%] border-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">{widget.name}</h3>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
      <div>
         <p>{widget.content || widget.description}</p>
      </div>
    </div>
  );
};

export default Widget;
