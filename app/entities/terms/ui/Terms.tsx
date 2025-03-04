import { Typography, Button } from "antd"

const { Paragraph } = Typography;

export function Terms() {

    const terms_link = process.env.NEXT_TERMS_LINK

    return (
        <Paragraph type='secondary' className='text-[12px]! mb-0! text-center!'>By continuing, you agree to the <Button type='link' className="text-[12px]! h-fit!" href={terms_link}>AI Love Photo Terms</Button> of Use and Privacy Policy</Paragraph>
    )
}