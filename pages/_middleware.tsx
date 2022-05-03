import {NextResponse, NextRequest} from 'next/server';

const Middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(
    `${req.nextUrl.origin}${req.nextUrl.pathname.toLowerCase()}`
  );
};

export default Middleware;
