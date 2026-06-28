import { rewrite, next } from '@vercel/edge';

export default function middleware(request) {
  // Check if the MAINTENANCE environment variable is set to '1'
  if (process.env.MAINTENANCE === '1') {
    const url = new URL(request.url);
    
    // If they are not already requesting the maintenance page, rewrite them to it.
    // Using a rewrite instead of a redirect keeps the original URL in the user's browser.
    if (!url.pathname.startsWith('/maintenance.html')) {
      url.pathname = '/maintenance.html';
      return rewrite(url);
    }
  }

  // Otherwise, proceed as normal
  return next();
}

// Only run middleware on HTML requests (skip assets like images, js, css)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - assets (vite output)
     * - images, favicon, etc.
     */
    '/((?!assets|favicon.ico|developer_3d.png|models).*)',
  ],
};
