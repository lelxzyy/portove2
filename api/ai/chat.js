import Groq from 'groq-sdk';

const systemPrompt = `Kamu adalah asisten AI di website portfolio Dalil Aminudin (lelxzyy),
seorang developer yang tertarik pada web development dan IoT. Jawab dalam bahasa
yang digunakan pengunjung, ramah, ringkas, dan profesional. Bantu menjelaskan
portfolio, project, skill, peluang kolaborasi, dan cara menghubungi Dalil. Jangan
mengarang fakta yang tidak tersedia. Jika tidak tahu informasi spesifik tentang
Dalil, arahkan pengunjung ke bagian Projects atau Contact.`;

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'GROQ_API_KEY belum dikonfigurasi' },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const safeMessages = messages
      .filter((message) => ['user', 'assistant'].includes(message?.role))
      .filter((message) => typeof message.content === 'string')
      .slice(-10)
      .map((message) => ({
        role: message.role,
        content: message.content.trim().slice(0, 2000),
      }))
      .filter((message) => message.content);

    if (!safeMessages.length || safeMessages.at(-1).role !== 'user') {
      return Response.json({ error: 'Pesan tidak valid' }, { status: 400 });
    }

    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, ...safeMessages],
      temperature: 0.5,
      max_completion_tokens: 500,
    });
    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('Groq tidak menghasilkan jawaban');
    }

    return Response.json({ message: content });
  } catch (error) {
    const status = error?.status >= 400 && error?.status < 600 ? error.status : 500;
    return Response.json(
      { error: status === 429 ? 'Batas penggunaan AI sedang tercapai. Coba lagi sebentar.' : 'AI gagal merespons. Silakan coba lagi.' },
      { status },
    );
  }
}
