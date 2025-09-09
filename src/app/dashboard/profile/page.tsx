"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const { toast } = useToast();
    const [name, setName] = useState("Ravi Kumar");
    const [location, setLocation] = useState("Jaipur, Rajasthan");
    const [story, setStory] = useState("I am a third-generation block-printer from Jaipur, keeping the traditions of my family alive through vibrant textiles...");
    const [heritage, setHeritage] = useState("Sanganeri block-printing is a traditional art form from Rajasthan, known for its delicate floral patterns and use of natural dyes.");

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically call an action to save the data to your backend
        console.log("Saving profile:", { name, location, story, heritage });
        toast({
            title: "Profile Saved!",
            description: "Your information has been updated successfully.",
        });
    };

    return (
        <div className="grid gap-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl font-headline">My Profile</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Story</CardTitle>
                    <CardDescription>
                        This information helps customers connect with you and your craft.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSaveChanges} className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artisan-story">Your Story / Bio</Label>
                            <Textarea
                                id="artisan-story"
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
                                className="min-h-32"
                            />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="culture-heritage">Cultural Heritage</Label>
                            <Textarea
                                id="culture-heritage"
                                value={heritage}
                                onChange={(e) => setHeritage(e.target.value)}
                                className="min-h-24"
                            />
                        </div>
                         <Button type="submit" className="w-fit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}