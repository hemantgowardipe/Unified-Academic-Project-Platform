'use server';

/**
 * @fileOverview Rewrites a commit message to be more descriptive using AI.
 *
 * - rewriteCommitMessage - A function that handles the commit message rewriting process.
 * - RewriteCommitMessageInput - The input type for the rewriteCommitMessage function.
 * - RewriteCommitMessageOutput - The return type for the rewriteCommitMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteCommitMessageInputSchema = z.object({
  commitMessage: z.string().describe('The original commit message.'),
  diff: z.string().describe('The diff of the commit.'),
});
export type RewriteCommitMessageInput = z.infer<typeof RewriteCommitMessageInputSchema>;

const RewriteCommitMessageOutputSchema = z.object({
  rewrittenMessage: z.string().describe('The rewritten, more descriptive commit message.'),
});
export type RewriteCommitMessageOutput = z.infer<typeof RewriteCommitMessageOutputSchema>;

export async function rewriteCommitMessage(
  input: RewriteCommitMessageInput
): Promise<RewriteCommitMessageOutput> {
  return rewriteCommitMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteCommitMessagePrompt',
  input: {schema: RewriteCommitMessageInputSchema},
  output: {schema: RewriteCommitMessageOutputSchema},
  prompt: `You are an AI that rewrites commit messages to be more descriptive.

  Original Commit Message: {{{commitMessage}}}
  Diff: {{{diff}}}

  Rewrite the commit message to be more descriptive:
  `,
});

const rewriteCommitMessageFlow = ai.defineFlow(
  {
    name: 'rewriteCommitMessageFlow',
    inputSchema: RewriteCommitMessageInputSchema,
    outputSchema: RewriteCommitMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
