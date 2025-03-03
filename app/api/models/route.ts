import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ROUTE = '/models'

export async function GET() {
    const session = await auth()

    const res = await fetch(API_URL+ROUTE, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.user?.access_token}`,
        },
    })
    const result = await res.json()
    return NextResponse.json({ result })
}
export async function POST(request: NextRequest) {
    const session = await auth()

    const body = await request.json()
    const res = await fetch(API_URL+ROUTE, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.user?.access_token}`,
        },
        body: JSON.stringify(body),
    })
    const data = await res.json();
    return NextResponse.json(data)
}