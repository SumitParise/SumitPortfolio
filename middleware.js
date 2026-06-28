import { get } from '@vercel/edge-config';

export default async function middleware(request) {
  // Read the maintenance flag from Edge Config at RUNTIME (no redeploy needed)
  const isMaintenance = await get('maintenance');

  if (isMaintenance === true) {
    const url = new URL(request.url);

    // Don't redirect if already on the maintenance page (avoid loops)
    if (!url.pathname.startsWith('/maintenance.html')) {
      url.pathname = '/maintenance.html';
      return new Response(null, {
        status: 307,
        headers: { Location: url.toString() },
      });
    }
  }

  // Site is live — proceed normally
  return undefined;
}

// Only run on page requests, skip static assets
export const config = {
  matcher: [
    '/((?!assets|favicon.ico|developer_3d.png|models|maintenance.html).*)',
  ],
};
