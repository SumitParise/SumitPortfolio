import { get } from '@vercel/edge-config';

export default async function middleware(request) {
  try {
    // Read the maintenance flag from Edge Config at RUNTIME (no redeploy needed)
    // If the EDGE_CONFIG env var is not set, this might throw an error.
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
  } catch (error) {
    // If Edge Config is not connected yet, or there's an error, just ignore and load the site normally.
    console.warn("Edge Config error (maintenance mode check skipped):", error.message);
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
