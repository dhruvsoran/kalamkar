
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KalaConnectIcon } from '@/components/icons';
import { getProducts, Product } from '@/lib/db';

export default async function ExplorePage() {
    const products = await getProducts();
    const activeProducts = products.filter(p => p.status === 'Active');

    return (
        <div className="flex flex-col min-h-screen bg-background">
             <header className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl font-headline">
                    <KalaConnectIcon className="h-8 w-8 text-primary" />
                    KalaConnect
                </Link>
                <Button asChild>
                    <Link href="/register">Join as an Artisan</Link>
                </Button>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Explore Our Marketplace</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Discover unique, handcrafted items directly from Indian artisans.
                    </p>
                </div>
                {activeProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {activeProducts.map((product) => (
                           <ProductCard key={product.name} product={product} />
                        ))}
                    </div>
                ) : (
                    <Card className="m-4">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Marketplace Coming Soon</CardTitle>
                            <CardDescription>
                                Our artisans are busy creating! Check back soon to see their beautiful products.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Button asChild className="mt-4">
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}


function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="overflow-hidden flex flex-col animate-fade-in">
            <CardHeader className="p-0">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="aspect-square object-cover w-full"
                    data-ai-hint={product.aiHint}
                />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <h3 className="font-bold text-lg font-headline">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                 <p className="font-semibold text-lg">{product.price}</p>
                <Button size="sm">Add to Cart</Button>
            </CardFooter>
        </Card>
    )
}
