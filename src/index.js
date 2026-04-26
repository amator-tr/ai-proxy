export default {
  async fetch(request, env) {
    const clientIP = request.headers.get('cf-connecting-ip');
    const allowed = (env.ALLOWED_IPS || '').split(',').map(s => s.trim());

    if (!allowed.includes(clientIP)) {
      return new Response('', {
        status: 444,
        headers: { 'Connection': 'close' },
      });
    }

    if (request.method !== 'POST') {
      return new Response('', { status: 444, headers: { 'Connection': 'close' } });
    }

    const url = new URL(request.url);
    const model = url.pathname.slice(1);

    if (!model || model.length < 5) {
      return new Response('', { status: 444, headers: { 'Connection': 'close' } });
    }

    try {
      const input = await request.json();
      const result = await env.AI.run(model, input);
      return Response.json({ success: true, result });
    } catch (err) {
      return Response.json({ success: false, errors: [{ message: err.message }] }, { status: 500 });
    }
  },
};
