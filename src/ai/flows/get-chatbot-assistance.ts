'use server';

/**
 * @fileOverview A chatbot assistance AI agent.
 *
 * - getChatbotAssistance - A function that handles the chatbot assistance process.
 * - GetChatbotAssistanceInput - The input type for the getChatbotAssistance function.
 * - GetChatbotAssistanceOutput - The return type for the getChatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetChatbotAssistanceInputSchema = z.object({
  query: z.string().describe('The query to ask the chatbot.'),
});
export type GetChatbotAssistanceInput = z.infer<typeof GetChatbotAssistanceInputSchema>;

const GetChatbotAssistanceOutputSchema = z.object({
  response: z.string().describe('The response from the chatbot.'),
});
export type GetChatbotAssistanceOutput = z.infer<typeof GetChatbotAssistanceOutputSchema>;

export async function getChatbotAssistance(input: GetChatbotAssistanceInput): Promise<GetChatbotAssistanceOutput> {
  return getChatbotAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getChatbotAssistancePrompt',
  input: {schema: GetChatbotAssistanceInputSchema},
  output: {schema: GetChatbotAssistanceOutputSchema},
  prompt: `You are a chatbot designed to help artisans onboard to the KalaConnect platform.

  Answer the following question about the platform:

  {{query}}`,
});

const getChatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'getChatbotAssistanceFlow',
    inputSchema: GetChatbotAssistanceInputSchema,
    outputSchema: GetChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
