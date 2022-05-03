import {NextResponse, NextRequest} from 'next/server';

const Middleware = (req: NextRequest) => {
  /* If pathname ends in .html, remove it. */
  if (req.nextUrl.pathname.endsWith('.html')) {
    return NextResponse.redirect(
      `${req.nextUrl.origin}${req.nextUrl.pathname.slice(0, -5).toLowerCase()}`,
      308
    );
  }

  if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(
    `${req.nextUrl.origin}${req.nextUrl.pathname.toLowerCase()}`,
    308
  );
};

export default Middleware;
