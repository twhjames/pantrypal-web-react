import { useToast } from "@/hooks/use-toast";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                description,
                action,
                ...props
            }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                        <div
                            className="absolute bottom-0 -left-6 -right-8 h-1 rounded-b-md bg-gradient-to-r from-orange-400 to-red-300 bg-[length:200%_100%]"
                            style={{
                                animation: `toast-countdown ${
                                    props.duration ?? 3000
                                }ms linear forwards, toast-border-slide ${
                                    props.duration ?? 3000
                                }ms linear`,
                            }}
                        />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
