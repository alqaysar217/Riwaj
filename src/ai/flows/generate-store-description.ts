'use server';
/**
 * @fileOverview A Genkit flow for generating captivating and culturally resonant store descriptions for Yemeni businesses.
 *
 * - generateStoreDescription - A function that handles the store description generation process.
 * - StoreDescriptionInput - The input type for the generateStoreDescription function.
 * - StoreDescriptionOutput - The return type for the generateStoreDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StoreDescriptionInputSchema = z.object({
  businessType: z
    .string()
    .describe('The type of business, e.g., "coffee shop", "handicraft store", "bakery".'),
  location: z
    .string()
    .describe('The geographic location of the business, e.g., "Sana\'a, Yemen", "Hadramout, Yemen".'),
  keyOfferings: z
    .string()
    .describe('A comma-separated list of the main products or services offered, e.g., "single-origin Yemeni coffee, traditional coffee brewing tools", "hand-woven textiles, silver jewelry".'),
});
export type StoreDescriptionInput = z.infer<typeof StoreDescriptionInputSchema>;

const StoreDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A captivating and culturally resonant description for the store\'s profile.'),
});
export type StoreDescriptionOutput = z.infer<typeof StoreDescriptionOutputSchema>;

export async function generateStoreDescription(
  input: StoreDescriptionInput
): Promise<StoreDescriptionOutput> {
  return generateStoreDescriptionFlow(input);
}

const generateStoreDescriptionPrompt = ai.definePrompt({
  name: 'generateStoreDescriptionPrompt',
  input: {schema: StoreDescriptionInputSchema},
  output: {schema: StoreDescriptionOutputSchema},
  prompt: `You are a marketing specialist for "Riwaj", a Yemeni marketplace dedicated to promoting local products.
Your goal is to craft a captivating, authentic, and culturally resonant store description that reflects the unique story and spirit of a Yemeni enterprise.
This description will be used in the store's profile to attract customers and convey its heritage.

Craft a description that is between 150 and 250 words, focusing on the quality, authenticity, and Yemeni cultural significance of the products and the business itself.
Emphasize words that evoke tradition, quality, and local craftsmanship.

Here are the details for the store:
Business Type: {{{businessType}}}
Location: {{{location}}}
Key Offerings: {{{keyOfferings}}}`,
});

const generateStoreDescriptionFlow = ai.defineFlow(
  {
    name: 'generateStoreDescriptionFlow',
    inputSchema: StoreDescriptionInputSchema,
    outputSchema: StoreDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateStoreDescriptionPrompt(input);
    return output!;
  }
);
