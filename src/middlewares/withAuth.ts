import {getToken} from 'next-auth/jwt';
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';

const onylAdmin = ['/dashboard'];
const onylAuthor = ['/profile', '/store/dashboard'];

export default function withAuth(middleware : NextMiddleware, requireAuth : string[] = []){
    return async (req : NextRequest, next : NextFetchEvent) => {
        const pathName = req.nextUrl.pathname;

        if(requireAuth.includes(pathName)){
            const token = await getToken({
                req,
                secret : process.env.NEXTAUTH_SECRET,
            });
            
            if(!token){
                const url = new URL('/login', req.url);
                url.searchParams.set('callbackUrl', encodeURI(req.url));
                return NextResponse.redirect(url);
            }

            if(token.role !== 'author' && onylAuthor.includes(pathName)){
                return NextResponse.redirect(new URL('/', req.url));
            }

            if(token.role !== 'admin' && onylAdmin.includes(pathName)){
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
        return middleware(req, next);
    }
}