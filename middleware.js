export default function middleware(request) {
  // Check if the MAINTENANCE environment variable is set to '1'
  if (process.env.MAINTENANCE === '1') {
    const url = new URL(request.url);
    
    // If they are not already requesting the maintenance page, rewrite them to it.
    if (!url.pathname.startsWith('/maintenance.html')) {
      url.pathname = '/maintenance.html';
      return new Response(null, {
        status: 307,
        headers: { Location: url.toString() },
      });
    }
  }

  // Otherwise, proceed as normal
  return undefined;
}

// Only run middleware on HTML requests (skip assets like images, js, css)
export const config = {
  matcher: [
    '/((?!assets|favicon.ico|developer_3d.png|models).*)',
  ],
};
