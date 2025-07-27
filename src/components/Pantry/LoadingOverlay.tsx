import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

interface LoadingOverlayProps {
    message?: string;
}

const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
    if (typeof document === "undefined") return null;
    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] pointer-events-auto">
            <div className="bg-white p-6 rounded-md shadow flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-medium text-gray-700">
                    {message || "Loading..."}
                </span>
            </div>
        </div>,
        document.body
    );
};

export default LoadingOverlay;
