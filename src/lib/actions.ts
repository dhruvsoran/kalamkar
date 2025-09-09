"use server";

import { generateProductDescription, GenerateProductDescriptionInput } from "@/ai/flows/generate-product-descriptions";
import { createMarketingContent, CreateMarketingContentInput } from "@/ai/flows/create-marketing-content";
import { getChatbotAssistance, GetChatbotAssistanceInput } from "@/ai/flows/get-chatbot-assistance";

type GenerateProductDescriptionActionInput = Omit<GenerateProductDescriptionInput, "productImageUri"> & {
    productImageUri: string;
};

export async function generateProductDescriptionAction(input: GenerateProductDescriptionActionInput) {
    try {
        const result = await generateProductDescription(input);
        return { productDescription: result.productDescription };
    } catch (error) {
        console.error("Error in generateProductDescriptionAction:", error);
        return { error: "Failed to generate description. Please check the server logs." };
    }
}

export async function createMarketingContentAction(input: CreateMarketingContentInput) {
    try {
        const result = await createMarketingContent(input);
        return { socialMediaPost: result.socialMediaPost, emailCampaign: result.emailCampaign };
    } catch (error) {
        console.error("Error in createMarketingContentAction:", error);
        return { error: "Failed to generate marketing content. Please check the server logs." };
    }
}


export async function getChatbotAssistanceAction(input: GetChatbotAssistanceInput) {
    try {
        const result = await getChatbotAssistance(input);
        return { response: result.response };
    } catch (error) {
        console.error("Error in getChatbotAssistanceAction:", error);
        return { error: "Sorry, I am having trouble connecting. Please try again later." };
    }
}
