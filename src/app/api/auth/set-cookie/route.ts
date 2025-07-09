import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST(request: Request) {
  const { token } = await request.json()

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 })
  }

  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/',
  })

  const response = NextResponse.json({ message: 'Cookie set' })
  response.headers.append('Set-Cookie', cookie)

  return response
}
