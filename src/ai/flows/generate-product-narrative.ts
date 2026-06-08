'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating authentic and engaging product narratives
 * for Yemeni products based on seller-provided details and product photos.
 *
 * - generateProductNarrative - A function that handles the product narrative generation process.
 * - GenerateProductNarrativeInput - The input type for the generateProductNarrative function.
 * - GenerateProductNarrativeOutput - The return type for the generateProductNarrative function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const GenerateProductNarrativeInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product, including its features and uses.'),
  category: z.string().describe('The category of the product (e.g., coffee, honey, incense, handicrafts, clothing, home-made foods, traditional products).'),
  origin: z.string().optional().describe('The region or place in Yemen where the product originates, if known.'),
  culturalSignificanceKeywords: z.array(z.string()).optional().describe('Optional keywords or phrases to guide the AI in highlighting specific cultural aspects.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateProductNarrativeInput = z.infer<typeof GenerateProductNarrativeInputSchema>;

// Output Schema
const GenerateProductNarrativeOutputSchema = z.object({
  narrativeTitle: z.string().describe('A captivating and culturally relevant title for the product narrative.'),
  narrativeBody: z.string().describe('The main body of the product narrative, an engaging story highlighting its quality, cultural significance, and connection to Yemeni heritage.'),
  keywords: z.array(z.string()).describe('A list of relevant keywords for SEO and product discovery, including cultural terms.'),
  culturalHighlight: z.string().describe('A specific Yemeni cultural tradition, historical context, or unique artisan technique highlighted in the narrative.'),
});
export type GenerateProductNarrativeOutput = z.infer<typeof GenerateProductNarrativeOutputSchema>;

// Wrapper function for the flow
export async function generateProductNarrative(input: GenerateProductNarrativeInput): Promise<GenerateProductNarrativeOutput> {
  return generateProductNarrativeFlow(input);
}

// Genkit Prompt Definition
const productNarrativePrompt = ai.definePrompt({
  name: 'productNarrativePrompt',
  input: { schema: GenerateProductNarrativeInputSchema },
  output: { schema: GenerateProductNarrativeOutputSchema },
  prompt: `You are an expert cultural storyteller and marketing specialist for authentic Yemeni products. Your task is to craft an engaging and evocative product narrative that highlights the unique quality, cultural significance, and heritage of the product.

Use the provided product details and image to create a compelling story that resonates with customers looking for authentic, high-quality, and culturally rich items. Emphasize Yemeni identity, craftsmanship, and the stories behind the products.

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}
Category: {{{category}}}
{{#if origin}}Origin: {{{origin}}}{{/if}}
{{#if culturalSignificanceKeywords}}Cultural Keywords to Emphasize: {{#each culturalSignificanceKeywords}}- {{{this}}}{{/each}}{{/if}}
Product Photo: {{media url=photoDataUri}}

Generate a narrative that includes:
- A captivating title for the product.
- A main body text that tells a story, highlights quality, cultural significance, and craftsmanship.
- A list of relevant keywords for discovery.
- A specific Yemeni cultural tradition, historical context, or unique artisan technique emphasized in the narrative.

Ensure the output is valid JSON according to the schema:
{
  "narrativeTitle": "string",
  "narrativeBody": "string",
  "keywords": ["string", "string", ...],
  "culturalHighlight": "string"
}`,
});

// Genkit Flow Definition
const generateProductNarrativeFlow = ai.defineFlow(
  {
    name: 'generateProductNarrativeFlow',
    inputSchema: GenerateProductNarrativeInputSchema,
    outputSchema: GenerateProductNarrativeOutputSchema,
  },
  async (input) => {
    const { output } = await productNarrativePrompt(input);
    if (!output) {
      throw new Error('Failed to generate product narrative.');
    }
    return output;
  }
);
