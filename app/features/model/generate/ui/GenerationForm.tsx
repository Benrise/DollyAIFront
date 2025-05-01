"use client";

import { Lightbulb } from 'lucide-react';
import { Button } from '@/app/shared/ui/button';
import { Textarea } from '@/app/shared/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/shared/ui/tooltip';

interface GenerationFormProps {
  prompt: string;
  activeModel?: {
    is_ready: boolean;
  };
  isSendingGenerationRequest: boolean;
  isListeningResult: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const GenerationForm = ({
  prompt,
  activeModel,
  isSendingGenerationRequest,
  isListeningResult,
  onPromptChange,
  onSubmit,
}: GenerationFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
      <div className="grid w-full gap-1.5 relative">
        <Textarea 
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={!activeModel || !activeModel.is_ready || isSendingGenerationRequest || isListeningResult}
          placeholder="Imagine me in Paris with the Eiffel Tower in the background"
          className="min-h-[80px] pr-10"
        />      
        <div className="absolute right-3 top-3">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                  <Lightbulb className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" align="end" className="max-w-[300px]">
                <p>The more detailed your description, the better the result will be</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {activeModel && !activeModel.is_ready ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button disabled size="lg" className='w-full'>
                Generate
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Model is training. Please wait. Often it takes a while (up to 3 hours).</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button 
          disabled={!activeModel || isSendingGenerationRequest || isListeningResult} 
          isLoading={isSendingGenerationRequest || isListeningResult} 
          className='w-full' 
          size="lg"
          type="submit"
        >
          Generate
        </Button>
      )}
    </form>
  );
};