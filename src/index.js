export default {
  async fetch(request, env) {
    const clientIP = request.headers.get('cf-connecting-ip');
    const allowed = (env.ALLOWED_IPS || '').split(',').map(s => s.trim());
    if (!allowed.includes(clientIP)) {
      return new Response('Not Found', { status: 404 });
    }

    if (request.method !== 'POST') {
      return new Response('Not Found', { status: 404 });
    }

    const url = new URL(request.url);
    const model = url.pathname.slice(1);

    if (!model || model.length < 5) {
      return new Response('Not Found', { status: 404 });
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
