import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { Alert, Typography } from "antd";

const { Text } = Typography

export function SubscriptionAlert() {
    return (
        <Alert className='w-full max-w-[960px]' 
          description={
            <div className='flex flex-col gap-4'>
              <Text className='text-start'>
                <HighlightedText>Models:</HighlightedText> Your subscription gives you a fixed number of model slots. Once all slots are filled, you can either upgrade your plan for more slots or pay extra to retrain an existing model.
              </Text>
              <Text className='text-start'>
                <HighlightedText>Generations:</HighlightedText> Each month, you get a base number of image generations. You can also purchase additional generations if needed. Unused generations don’t expire—they carry over to the next month, but you’ll need an active subscription to use them.
              </Text>
            </div>}
          showIcon
      />
    )
}