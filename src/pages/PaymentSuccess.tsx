import React, { useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Package, Download } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const PaymentSuccess: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state?.orderData;
    const orderId = location.state?.orderId;

    useEffect(() => {
        document.title = "Order Confirmed | Pantry Saver";

        // TODO: Verify payment status with backend
        // const verifyPayment = async () => {
        //   const { data, error } = await supabase.functions.invoke('verify-payment', {
        //     body: { sessionId: getSessionIdFromUrl() }
        //   });
        //   if (error) {
        //     // Handle payment verification error
        //   }
        // };
        // verifyPayment();
    }, []);

    useEffect(() => {
        // Redirect if no order data
        if (!orderData) {
            navigate("/");
            toast({
                title: "No order found",
                description: "Redirecting to home page.",
                variant: "destructive",
            });
        }
    }, [orderData, navigate]);

    if (!orderData) {
        return null;
    }

    const handleDownloadReceipt = () => {
        // TODO: Generate and download PDF receipt
        // const { data, error } = await supabase.functions.invoke('generate-receipt', {
        //   body: { orderId }
        // });
        // if (data) {
        //   const blob = new Blob([data.pdf], { type: 'application/pdf' });
        //   const url = window.URL.createObjectURL(blob);
        //   const a = document.createElement('a');
        //   a.href = url;
        //   a.download = `receipt-${orderId}.pdf`;
        //   a.click();
        // }

        toast({
            title: "Download Receipt",
            description:
                "TODO: Implement PDF receipt generation via Supabase Edge Function",
        });
    };

    return (
        <AppLayout>
            <main className="p-6 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-green-600 mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your order has been
                        successfully placed.
                    </p>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Order ID</h3>
                                <p className="text-sm text-muted-foreground font-mono">
                                    {orderId}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">
                                    Customer Information
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <p>
                                        <span className="font-medium">
                                            Name:
                                        </span>{" "}
                                        {orderData.customerInfo.fullName}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Email:
                                        </span>{" "}
                                        {orderData.customerInfo.email}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Phone:
                                        </span>{" "}
                                        {orderData.customerInfo.phone}
                                    </p>
                                    {orderData.customerInfo
                                        .deliveryInstructions && (
                                        <p>
                                            <span className="font-medium">
                                                Delivery Instructions:
                                            </span>{" "}
                                            {
                                                orderData.customerInfo
                                                    .deliveryInstructions
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">
                                    Items Ordered
                                </h3>
                                <div className="space-y-2">
                                    {orderData.items.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span>
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span>
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between font-semibold">
                                    <span>Total Paid</span>
                                    <span>${orderData.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            What's Next?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <div>
                                    <p className="font-medium">
                                        Order Confirmation
                                    </p>
                                    <p className="text-muted-foreground">
                                        You'll receive an email confirmation
                                        shortly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                                <div>
                                    <p className="font-medium">Processing</p>
                                    <p className="text-muted-foreground">
                                        Our partner retailers will prepare your
                                        items.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                                <div>
                                    <p className="font-medium">
                                        Ready for Pickup
                                    </p>
                                    <p className="text-muted-foreground">
                                        You'll be notified when your order is
                                        ready.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={handleDownloadReceipt}
                        variant="outline"
                        className="flex-1"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                    </Button>
                    <Button asChild className="flex-1">
                        <Link to="/deals">Continue Shopping</Link>
                    </Button>
                </div>

                <div className="text-center mt-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="text-muted-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Button>
                </div>

                {/* TODO: Add order tracking functionality */}
                <div className="mt-8 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        📦 <strong>Coming Soon:</strong> Real-time order
                        tracking and delivery updates
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Backend integration needed for order status updates and
                        notification system
                    </p>
                </div>
            </main>
        </AppLayout>
    );
};

export default PaymentSuccess;
