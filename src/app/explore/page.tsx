import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KalaConnectIcon } from '@/components/icons';

export default function ExplorePage() {
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
            <main className="flex-grow flex items-center justify-center">
                 <Card className="m-4">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Explore Handicrafts</CardTitle>
                        <CardDescription>
                            Our marketplace for customers is coming soon.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Soon, you will be able to discover and purchase unique, handcrafted items directly from Indian artisans and even use our Virtual Try-Out feature to see them in your home.</p>
                        <Button asChild className="mt-4">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
