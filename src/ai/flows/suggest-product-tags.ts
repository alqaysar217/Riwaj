'use server';
/**
 * @fileOverview A Genkit flow for suggesting product categories and tags.
 *
 * - suggestProductTags - A function that suggests categories and tags for a product.
 * - SuggestProductTagsInput - The input type for the suggestProductTags function.
 * - SuggestProductTagsOutput - The return type for the suggestProductTags function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestProductTagsInputSchema = z.object({
  productDescription: z.string().describe('A detailed description of the product.'),
  productImage: z.string().optional().describe(
    "An optional image of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type SuggestProductTagsInput = z.infer<typeof SuggestProductTagsInputSchema>;

const SuggestProductTagsOutputSchema = z.object({
  suggestedCategories: z.array(z.string()).describe('A list of suggested categories for the product.'),
  suggestedTags: z.array(z.string()).describe('A list of suggested tags or keywords for the product.'),
});
export type SuggestProductTagsOutput = z.infer<typeof SuggestProductTagsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestProductTagsPrompt',
  input: { schema: SuggestProductTagsInputSchema },
  output: { schema: SuggestProductTagsOutputSchema },
  prompt: `You are an expert e-commerce product classifier. Your task is to analyze the provided product description and image (if available) and suggest relevant categories and tags.
The product is intended for the Yemeni marketplace "Riwaj", which specializes in local Yemeni products including coffee, honey, incense, perfumes, handicrafts, clothing, accessories, home-made foods, and traditional products from small businesses and productive families.

Provide only relevant and specific categories and tags. Do not include categories that are too broad or generic.
Ensure the suggested tags are highly relevant keywords that customers might use to find this product.

Product Description: {{{productDescription}}}
{{#if productImage}}
Product Image: {{media url=productImage}}
{{/if}}

Based on the information above, suggest appropriate categories and tags for this product.`,
});

const suggestProductTagsFlow = ai.defineFlow(
  {
    name: 'suggestProductTagsFlow',
    inputSchema: SuggestProductTagsInputSchema,
    outputSchema: SuggestProductTagsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate product tags and categories.');
    }
    return output;
  }
);

export async function suggestProductTags(input: SuggestProductTagsInput): Promise<SuggestProductTagsOutput> {
  return suggestProductTagsFlow(input);
}
