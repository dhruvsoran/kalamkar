'use server';

/**
 * @fileOverview AI-powered product description generator for artisans.
 *
 * - generateProductDescription - A function that generates product descriptions.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productImageUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  productName: z.string().describe('The name of the product.'),
  artisanCulture: z.string().describe('The cultural background of the artisan.'),
  craftTechniques: z.string().describe('The techniques used to create the product.'),
  productMaterials: z.string().describe('The materials used to create the product.'),
  productDimensions: z.string().describe('The dimensions of the product.'),
  productRegion: z.string().describe('The region where the product was made.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  productDescription: z.string().describe('A compelling, culturally relevant product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a marketing expert specializing in crafting product descriptions for culturally significant artisanal products.

  Given the following information about a product, create a compelling and culturally relevant product description.
  The description should highlight the unique aspects of the product, its cultural significance, and the artisan's craftsmanship.

  Product Name: {{{productName}}}
  Artisan Culture: {{{artisanCulture}}}
  Craft Techniques: {{{craftTechniques}}}
  Product Materials: {{{productMaterials}}}
  Product Dimensions: {{{productDimensions}}}
  Product Region: {{{productRegion}}}
  Product Image: {{media url=productImageUri}}
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
