import { HighlightedText } from "@/app/shared/ui/highlighted-text";


export function SubscriptionAlert() {
    return (
        <div className='w-full max-w-[960px]' 
        >
          <div className='flex flex-col gap-4 p-10 bg-popover border border-border rounded-2xl'>
            <div className='text-start text-[1rem]'>
              <HighlightedText>Models:</HighlightedText> Your subscription gives you a fixed number of model slots. Once all slots are filled, you can either upgrade your plan for more slots or pay extra to retrain an existing model.
            </div>
            <div className='text-start text-[1rem]'>
              <HighlightedText>Generations:</HighlightedText> Each month, you get a base number of image generations. You can also purchase additional generations if needed. Unused generations don’t expire—they carry over to the next month, but you’ll need an active subscription to use them.
            </div>
          </div>
      </div>
    )
}