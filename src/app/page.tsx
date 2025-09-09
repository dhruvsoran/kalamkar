
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brush, Zap, LineChart, MessageCircle, Mic, Bot } from 'lucide-react';
import { KalaConnectIcon } from '@/components/icons';
import { HomeHeaderActions } from '@/components/home-header-actions';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl font-headline">
            <KalaConnectIcon className="h-8 w-8 text-primary" />
            KalaConnect
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/explore" className="text-sm font-medium hover:underline underline-offset-4">
              Explore
            </Link>
          </nav>
          <HomeHeaderActions />
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight animate-fade-in-down">
              Empowering Artisans,
              <br />
              <span className="text-primary">Celebrating Heritage</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-in-up">
              KalaConnect is an AI-powered marketplace that helps Indian artisans and craftsmen thrive in the digital world.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/register?role=artisan">Start Selling</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm-w-auto">
                <Link href="/explore">Start Buying</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-card border-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">A Platform Built for You</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Discover the tools that make selling your craft easier than ever.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="AI-Powered Descriptions"
                description="Generate beautiful, culturally-rich product descriptions from just a photo and a few words."
              />
              <FeatureCard
                icon={<Brush className="h-8 w-8 text-primary" />}
                title="Automated Marketing"
                description="Create social media posts and email campaigns automatically to reach a wider audience."
              />
              <FeatureCard
                icon={<LineChart className="h-8 w-8 text-primary" />}
                title="Business Insights"
                description="Get smart pricing suggestions, trend forecasts, and customer behavior analytics."
              />
              <FeatureCard
                icon={<Mic className="h-8 w-8 text-primary" />}
                title="Voice & Language Support"
                description="Easily manage your shop using your voice in your local language. No typing required."
              />
              <FeatureCard
                icon={<Bot className="h-8 w-8 text-primary" />}
                title="24/7 Chatbot Guidance"
                description="Our AI chatbot is always available to help you set up your shop and answer questions."
              />
              <FeatureCard
                icon={<MessageCircle className="h-8 w-8 text-primary" />}
                title="AI Matchmaking"
                description="We connect your products with the right customers based on their tastes and interests."
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://picsum.photos/600/500"
                alt="Artisan working"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
                data-ai-hint="artisan hands"
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Weaving Tradition with Technology</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Our mission is to bridge the gap between India's rich artisanal heritage and the global digital marketplace. We provide artisans with cutting-edge AI tools, a supportive community, and a platform to share their stories and sell their creations to the world.
              </p>
              <Button size="lg" asChild className="mt-8">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KalaConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center bg-background border-none shadow-none animate-fade-in">
      <CardHeader className="items-center">
        <div className="bg-card p-4 rounded-full">
          {icon}
        </div>
        <CardTitle className="mt-4 font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
