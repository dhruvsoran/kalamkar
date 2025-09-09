import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AnalyticsPage() {
    return (
         <div className="grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl font-headline">Analytics</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>
                        Our advanced business insights dashboard is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Check back soon for pricing suggestions, customer behavior analytics, and trend forecasting to help you grow your business!</p>
                </CardContent>
            </Card>
        </div>
    );
}
