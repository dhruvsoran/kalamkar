
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { getProducts, Product } from '@/lib/db';
import { Trash2, ShoppingCart } from 'lucide-react';
import { HomeHeaderActions } from '@/components/home-header-actions';
import { KalaConnectIcon } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
    const [cart, setCart] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchProducts() {
            const allProducts = await getProducts();
            setProducts(allProducts);
        }
        fetchProducts();

        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    const removeFromCart = (productName: string) => {
        const newCart = cart.filter(item => item.name !== productName);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        toast({
            title: "Item removed",
            description: `${productName} has been removed from your cart.`,
        });
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => {
             const price = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
             return total + price;
        }, 0);
    };

    return (
         <div className="flex flex-col min-h-screen bg-background">
             <header className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl font-headline">
                        <KalaConnectIcon className="h-8 w-8 text-primary" />
                        KalaConnect
                    </Link>
                    <HomeHeaderActions />
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline flex items-center gap-3">
                            <ShoppingCart className="h-8 w-8" /> Your Shopping Cart
                        </CardTitle>
                        <CardDescription>Review your items and proceed to checkout.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {cart.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[120px]">Product</TableHead>
                                        <TableHead></TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.map(item => (
                                        <TableRow key={item.name}>
                                            <TableCell>
                                                <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md object-cover" />
                                            </TableCell>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.name)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-right font-bold text-lg">Subtotal</TableCell>
                                        <TableCell className="font-bold text-lg">₹{getSubtotal().toFixed(2)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild size="lg">
                                                <Link href="/checkout">Proceed to Checkout</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">Your cart is empty.</p>
                                <Button asChild className="mt-4">
                                    <Link href="/explore">Start Shopping</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
