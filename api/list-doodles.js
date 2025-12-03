import { list } from "@vercel/blob";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  try {
    const { blobs } = await list({ prefix: "doodles/" });

    // sort newest → oldest
    blobs.sort((a, b) => b.uploadedAt - a.uploadedAt);

    // OPTIONAL: limit to last 30 doodles
    const latest = blobs.slice(0, 30);

    return new Response(
      JSON.stringify({
        doodles: latest.map(b => b.url)
      }),
      { status: 200 }
    );

  } catch (e) {
    return new Response(JSON.stringify({ error: e.toString() }), { status: 500 });
  }
}
