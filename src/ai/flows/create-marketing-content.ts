'use server';

/**
 * @fileOverview Generates personalized marketing content for artisans' products.
 *
 * - createMarketingContent - A function that generates marketing content.
 * - CreateMarketingContentInput - The input type for the createMarketingContent function.
 * - CreateMarketingContentOutput - The return type for the createMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateMarketingContentInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  artisanName: z.string().describe('The name of the artisan.'),
  cultureHeritage: z.string().describe('Information about the cultural heritage associated with the product.'),
  targetAudience: z.string().describe('Description of the target audience for the product.'),
});
export type CreateMarketingContentInput = z.infer<typeof CreateMarketingContentInputSchema>;

const CreateMarketingContentOutputSchema = z.object({
  socialMediaPost: z.string().describe('A personalized social media post for the product.'),
  emailCampaign: z.string().describe('A personalized email campaign for the product.'),
});
export type CreateMarketingContentOutput = z.infer<typeof CreateMarketingContentOutputSchema>;

export async function createMarketingContent(input: CreateMarketingContentInput): Promise<CreateMarketingContentOutput> {
  return createMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createMarketingContentPrompt',
  input: {schema: CreateMarketingContentInputSchema},
  output: {schema: CreateMarketingContentOutputSchema},
  prompt: `You are a marketing expert specializing in promoting handcrafted products from Indian artisans.

  Generate a social media post and an email campaign to promote the artisan's product.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Artisan Name: {{{artisanName}}}
  Cultural Heritage: {{{cultureHeritage}}}
  Target Audience: {{{targetAudience}}}

  Social Media Post:
  Email Campaign: `,
});

const createMarketingContentFlow = ai.defineFlow(
  {
    name: 'createMarketingContentFlow',
    inputSchema: CreateMarketingContentInputSchema,
    outputSchema: CreateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
