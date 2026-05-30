export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0D76BC"/><stop offset="0.52" stop-color="#244A72"/><stop offset="1" stop-color="#F2673C"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g)"/><circle cx="48" cy="16" r="6" fill="#F7F3EA" opacity=".92"/><path d="M17 44V20h7l8 13 8-13h7v24h-7V31.5l-6 9h-4l-6-9V44z" fill="#FFFFFF"/></svg>`

  return new Response(svg, {
    headers: {
      'cache-control': 'public, max-age=0, must-revalidate',
      'content-type': 'image/svg+xml',
    },
  })
}
