import React, { useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ArrowLeft, ShoppingCart, CreditCard } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Cart: React.FC = () => {
    const {
        items,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItems,
    } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Your Cart | Pantry Saver";
    }, []);

    return (
        <AppLayout>
            <main className="p-6 max-w-6xl mx-auto">
                <header className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            aria-label="Go back"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Your Cart</h1>
                            <p className="text-muted-foreground">
                                {totalItems} item{totalItems !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={clearCart}
                        disabled={items.length === 0}
                    >
                        <Trash2 className="h-4 w-4 mr-2" /> Clear cart
                    </Button>
                </header>

                {items.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h2 className="text-xl font-semibold mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Find great deals and start saving.
                        </p>
                        <Button asChild>
                            <Link to="/deals">Browse deals</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <section className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={`${item.name} product image`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="font-medium leading-tight">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.retailerName}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-semibold">
                                                            $
                                                            {(
                                                                item.price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            $
                                                            {item.price.toFixed(
                                                                2
                                                            )}{" "}
                                                            each
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <label
                                                            htmlFor={`qty-${item.id}`}
                                                            className="text-sm text-muted-foreground"
                                                        >
                                                            Qty
                                                        </label>
                                                        <Input
                                                            id={`qty-${item.id}`}
                                                            type="number"
                                                            className="w-24"
                                                            min={1}
                                                            max={
                                                                item.maxQuantity ??
                                                                undefined
                                                            }
                                                            value={
                                                                item.quantity
                                                            }
                                                            onChange={(e) =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    Number(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                        />
                                                        {item.maxQuantity && (
                                                            <span className="text-xs text-muted-foreground">
                                                                max{" "}
                                                                {
                                                                    item.maxQuantity
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />{" "}
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </section>

                        <aside>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Taxes</span>
                                            <span>Calculated at checkout</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Fees</span>
                                            <span>Calculated at checkout</span>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between font-semibold text-base">
                                        <span>Total</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <Button
                                        className="w-full mt-4"
                                        onClick={() => navigate("/checkout")}
                                    >
                                        <CreditCard className="h-4 w-4 mr-2" />{" "}
                                        Proceed to checkout
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-2"
                                        asChild
                                    >
                                        <Link to="/deals">
                                            Continue shopping
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                )}
            </main>
        </AppLayout>
    );
};

export default Cart;
