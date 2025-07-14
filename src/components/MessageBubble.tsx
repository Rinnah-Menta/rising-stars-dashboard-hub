
import { Check, CheckCheck } from "lucide-react";
import { Message } from "./MessagingApp";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className={cn(
      "flex",
      message.isOwn ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm",
        message.isOwn 
          ? "bg-green-600 text-white" 
          : "bg-white text-gray-900 border border-gray-200"
      )}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        
        <div className={cn(
          "flex items-center justify-end mt-1 space-x-1",
          message.isOwn ? "text-green-100" : "text-gray-500"
        )}>
          <span className="text-xs">{message.timestamp}</span>
          {message.isOwn && (
            <div className="flex items-center">
              {message.status === 'sent' && <Check className="w-3 h-3" />}
              {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
              {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-400" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
