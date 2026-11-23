# Content Security Policy

The policy is configured in the Vercel headers for every route. Keep its source
allowlists aligned with the URLs used by the app.

| Directive | Purpose |
| --- | --- |
| `default-src 'self'` | Denies resources from other origins unless another directive explicitly allows them. |
| `base-uri 'self'` | Prevents injected base URLs from redirecting relative links. |
| `object-src 'none'` | Disables embedded plug-in content. |
| `frame-ancestors 'none'` | Prevents this site from being embedded in frames. |
| `form-action 'self'` | Restricts form submissions to this site. |
| `script-src 'self'` | Loads executable scripts only from this site. |
| `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` | Allows the bundled styles, Google Fonts CSS, and inline styles used by Tailwind/MapLibre. |
| `font-src 'self' data: https://fonts.gstatic.com` | Allows local fonts, data URLs, and Google Fonts files. |
| `img-src 'self' data: blob: https://*.supabase.co https://tiles.openfreemap.org https://services.arcgisonline.com https://s3.amazonaws.com` | Allows local and inline/blob images, Supabase media, OpenFreeMap and ArcGIS tiles, and AWS elevation tiles. |
| `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://tiles.openfreemap.org https://services.arcgisonline.com https://s3.amazonaws.com` | Allows app/API requests, Supabase REST and realtime connections, map styles/tiles, and AWS elevation data. |
| `worker-src 'self' blob:` | Allows the bundled MapLibre worker and workers created from blob URLs. |

`X-Frame-Options: DENY` is also sent for compatibility with older browsers.
If the app adds a new external service, add only the required origin to the
relevant directive and verify the feature in production.
