import { Typography } from "antd"
import { HighlightedText } from "@/app/shared/ui/highlighted-text";

const { Paragraph } = Typography;

export function Terms() {
    return (
        <Paragraph type='secondary' className='text-[12px]! mb-0! text-center!'>By continuing, you agree to the <HighlightedText>AI Love Photo Terms</HighlightedText> of Use and Privacy Policy</Paragraph>
    )
}