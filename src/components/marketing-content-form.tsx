"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, Copy, Send, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createMarketingContentAction } from "@/lib/actions";

const formSchema = z.object({
    productName: z.string().min(1, "Please select a product."),
    productDescription: z.string().min(10, "Description must be at least 10 characters."),
    artisanName: z.string().min(2, "Artisan name is required."),
    cultureHeritage: z.string().min(10, "Cultural heritage is required."),
    targetAudience: z.string().min(5, "Target audience is required."),
});

type FormValues = z.infer<typeof formSchema>;

const products = [
    { name: "Hand-painted Madhubani Saree", description: "A beautiful Tussar silk saree, hand-painted with traditional Madhubani motifs depicting tales of nature and mythology.", culture: "Mithila region of Bihar" },
    { name: "Terracotta Horse Statue", description: "A rustic terracotta horse, symbolizing power and grace, handcrafted by artisans from Panchmura village.", culture: "Bankura district of West Bengal" },
];

export function MarketingContentForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [socialMediaPost, setSocialMediaPost] = useState("");
    const [emailCampaign, setEmailCampaign] = useState("");
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            artisanName: "Ravi Kumar",
            cultureHeritage: "",
            targetAudience: "Art lovers, people interested in Indian culture",
        },
    });
    
    const handleProductChange = (productName: string) => {
        const product = products.find(p => p.name === productName);
        if (product) {
            form.setValue("productName", product.name);
            form.setValue("productDescription", product.description);
            form.setValue("cultureHeritage", product.culture);
        }
    };

    async function onSubmit(data: FormValues) {
        setIsLoading(true);
        setSocialMediaPost("");
        setEmailCampaign("");
        try {
            const result = await createMarketingContentAction(data);
            if (result.error) throw new Error(result.error);
            
            setSocialMediaPost(result.socialMediaPost || "");
            setEmailCampaign(result.emailCampaign || "");

            toast({
                title: "Content Generated!",
                description: "Your new marketing materials are ready.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "Could not generate marketing content. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: `Copied ${type} to clipboard!` });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2 lg:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Details</CardTitle>
                        <CardDescription>Select a product and provide a few details to generate marketing content.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <FormField control={form.control} name="productName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product</FormLabel>
                                <Select onValueChange={handleProductChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Select a product to market" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {products.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="productDescription" render={({ field }) => (
                            <FormItem><FormLabel>Product Description</FormLabel><FormControl><Textarea placeholder="Description of the product" {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="artisanName" render={({ field }) => (
                            <FormItem><FormLabel>Artisan Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cultureHeritage" render={({ field }) => (
                            <FormItem><FormLabel>Cultural Heritage</FormLabel><FormControl><Input placeholder="e.g., Mithila, Bihar" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="targetAudience" render={({ field }) => (
                            <FormItem><FormLabel>Target Audience</FormLabel><FormControl><Input placeholder="e.g., Art lovers, tourists" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <Button type="submit" size="lg" disabled={isLoading}>
                            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Content</>}
                        </Button>
                    </CardContent>
                </Card>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2"><Send className="h-5 w-5"/> Social Media Post</CardTitle>
                                <CardDescription>A short post for platforms like Instagram or Facebook.</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(socialMediaPost, "Social Post")} disabled={!socialMediaPost}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Textarea placeholder="Generated social media post will appear here..." value={socialMediaPost} readOnly rows={8} className="bg-muted" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                             <div>
                                <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5"/> Email Campaign</CardTitle>
                                <CardDescription>A longer-form email to send to your mailing list.</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(emailCampaign, "Email Content")} disabled={!emailCampaign}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Textarea placeholder="Generated email campaign will appear here..." value={emailCampaign} readOnly rows={12} className="bg-muted"/>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
}
