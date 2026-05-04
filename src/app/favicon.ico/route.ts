export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#123c33"/><path d="M18 46V17h28v6H26v7h17v6H26v10z" fill="#f7f3ea"/></svg>`

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml',
    },
  })
}
