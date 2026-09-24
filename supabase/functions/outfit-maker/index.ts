import "@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  } else {
    const { clothes, tags, style, tempt } = await req.json();
    const SYSTEM_PROMPT: string = `You are an outfit-building assistant for a virtual closet app. You will be given:
1. The user's full closet as a JSON array of clothing items, each with: id, name, category, colors, tags, brand, material, notes.
2. The occasion the user wants the outfit for.
3. The desired style (e.g. Streetwear, Old Money, Coquette, etc.).
4. The current weather/temperature (Hot, Mild, or Cold).
5. Optional additional notes from the user.

Your job is to select items from the closet that together form a coherent, wearable outfit matching the requested occasion, style, and weather, using their category, colors, tags, material, and notes as your reasoning basis — the requested style does not need to exactly match an item's tags, use your judgment on what fits the aesthetic.

Respond ONLY with a valid JSON object, with no additional text before or after, no markdown, no explanations outside the JSON.

RULES:
- The outfit must include AT MINIMUM one top and one bottom, OR one dress. Shoes should be included when a suitable pair exists in the closet. Accessories and outerwear are optional — include them only when they genuinely improve the outfit for the given occasion/weather.
- Only select items that actually exist in the provided closet array. Never invent items.
- If the closet does NOT contain enough compatible items to form a valid outfit (for example: no tops available, or no bottoms/dresses at all, or nothing matches the requested weather), do not force a combination — return a failure response instead.
- Prioritize coherence: colors and materials should reasonably work together, and the overall combination should make sense for the stated occasion and weather.

If a valid outfit CAN be formed, respond exactly in this shape:
{
  "success": true,
  "outfitItemIds": string[] (the ids of the selected items),
  "reason": string (a brief, friendly explanation of why these pieces were chosen together, referencing the occasion, style, and/or weather),
  "error": null
}

If a valid outfit CANNOT be formed, respond exactly in this shape:
{
  "success": false,
  "outfitItemIds": [],
  "reason": null,
  "error": string (a clear, brief explanation of what's missing, e.g. "Your closet doesn't have any bottoms or dresses to pair with this top.")
}`
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `${JSON.stringify(clothes)} ${tags} ${style} ${tempt}`
            },
          ],
          response_format: {
            type: "json_schema",
             json_schema: {
              name: "outfit_maker",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  outfitItemIds: { 
                    type: "array",
                    items: { type: "string" }
                  },
                  reason: { 
                    anyOf: [{ type: "string" }, { type: "null" }] 
                  },
                  error: { 
                    anyOf: [{ type: "string" }, { type: "null" }] 
                  }
                },
                required: ["success", "outfitItemIds", "reason", "error"],
                additionalProperties: false
              },
             }
            },
          "model": "openai/gpt-oss-120b",
          "temperature": 1,
          "max_completion_tokens": 1000,
          "top_p": 1,
        }),
      },
    );
    const data = await response.json();
    return Response.json({ response: data }, {
      headers: corsHeaders,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/ai-caller' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"name":"Functions"}'

*/
