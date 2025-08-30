import React, { useEffect, useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    CreditCard,
    ArrowLeft,
    Loader2,
    MapPin,
    Phone,
    Mail,
    User,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    deliveryInstructions: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout: React.FC = () => {
    const { items, subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const form = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            deliveryInstructions: "",
        },
    });

    useEffect(() => {
        document.title = "Checkout | Pantry Saver";
    }, []);

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            navigate("/cart");
        }
    }, [items.length, navigate]);

    const calculateTax = (subtotal: number) => {
        // TODO: Replace with actual tax calculation based on user location
        // const taxRate = await getTaxRateForLocation(userLocation);
        return subtotal * 0.08; // 8% tax rate (hardcoded for demo)
    };

    const calculateDeliveryFee = () => {
        // TODO: Replace with actual delivery fee calculation
        // const fee = await calculateDeliveryFeeForLocation(userLocation, items);
        return subtotal >= 25 ? 0 : 2.99; // Free delivery over $25
    };

    const tax = calculateTax(subtotal);
    const deliveryFee = calculateDeliveryFee();
    const total = subtotal + tax + deliveryFee;

    const onSubmit = async (data: CheckoutFormData) => {
        setIsProcessing(true);

        try {
            // TODO: Save order to database before payment
            // const order = await supabase.from('orders').insert({
            //   customer_name: data.fullName,
            //   customer_email: data.email,
            //   customer_phone: data.phone,
            //   delivery_instructions: data.deliveryInstructions,
            //   items: items,
            //   subtotal: subtotal,
            //   tax: tax,
            //   delivery_fee: deliveryFee,
            //   total: total,
            //   status: 'pending'
            // }).select().single();

            // TODO: Create Stripe payment session via Supabase Edge Function
            // const { data: paymentData, error } = await supabase.functions.invoke('create-payment', {
            //   body: {
            //     orderId: order.data.id,
            //     items: items,
            //     customerInfo: data,
            //     amounts: { subtotal, tax, deliveryFee, total }
            //   }
            // });

            // if (error) {
            //   toast({
            //     title: "Payment Error",
            //     description: "Failed to create payment session. Please try again.",
            //     variant: "destructive",
            //   });
            //   return;
            // }

            // TODO: Redirect to Stripe Checkout
            // window.location.href = paymentData.checkoutUrl;

            // For demo: simulate successful order
            console.log("Order Data:", {
                customerInfo: data,
                items,
                amounts: { subtotal, tax, deliveryFee, total },
            });

            toast({
                title: "Order Processing",
                description:
                    "TODO: Integrate with Stripe via Supabase Edge Functions for actual payment processing.",
            });

            // Clear cart and redirect to success page
            clearCart();
            navigate("/payment-success", {
                state: {
                    orderData: { customerInfo: data, items, total },
                    // In real implementation, pass the actual order ID
                    orderId: "demo-order-" + Date.now(),
                },
            });
        } catch (error) {
            console.error("Checkout error:", error);
            toast({
                title: "Error",
                description:
                    "Something went wrong during checkout. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <AppLayout>
            <main className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Checkout</h1>
                        <p className="text-muted-foreground">Secure payment</p>
                    </div>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="(555) 123-4567"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="deliveryInstructions"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Delivery Instructions
                                                    (Optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ring doorbell, apartment 2B"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Delivery Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            TODO: Implement address
                                            selection/input form
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Backend integration needed for
                                            address validation and delivery zone
                                            checking
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-1">
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between"
                                            >
                                                <span className="text-left">
                                                    {item.name} ×{" "}
                                                    {item.quantity}
                                                </span>
                                                <span>
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax (8%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Delivery Fee</span>
                                            <span>
                                                {deliveryFee === 0
                                                    ? "FREE"
                                                    : `$${deliveryFee.toFixed(
                                                          2
                                                      )}`}
                                            </span>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between font-semibold text-base">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full mt-6"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                Complete Order
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full mt-2"
                                        asChild
                                    >
                                        <Link to="/cart">Back to Cart</Link>
                                    </Button>

                                    <div className="mt-4 p-3 bg-muted rounded-lg">
                                        <p className="text-xs text-muted-foreground">
                                            🔒 Secure checkout powered by Stripe
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            By placing your order, you agree to
                                            our Terms of Service and Privacy
                                            Policy.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </form>
                </Form>
            </main>
        </AppLayout>
    );
};

export default Checkout;
