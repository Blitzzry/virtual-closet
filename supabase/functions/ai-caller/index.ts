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
    const { image, language } = await req.json();
    const SYSTEM_PROMPT: string =
      `You are a clothing and accessory classifier. Analyze the image and respond ONLY with a valid JSON object, with no additional text before or after, no markdown, no explanations.
You will also receive a target language code such as "es" or "en".

IMPORTANT: All user-facing text MUST be written in the target language. This includes:
- "name"
- "tags"
- generic fallback values like "generic"
- "material"
- "notes"
- "reason"

Do NOT translate internal application values.

The "category" field must always be exactly one of:
"tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories"

First determine whether the image shows a recognizable clothing item or accessory: shirts, t-shirts, pants, dresses, shoes, coats, bags, bras, bracelets, rings, belts, etc.

If it is NOT a clothing item/accessory, respond exactly in this shape:
{
  "isGarment": false,
  "item": null,
  "reason": "brief explanation in the target language of what was detected instead"
}

If it IS a valid clothing item/accessory, respond exactly in this shape:
{
  "isGarment": true,
  "item": {
    "name": string,
    "category": exactly one of: "tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories",
    "colors": string[] (2-3 main colors in hexadecimal format, up to 6 if the item is extremely multicolored),
    "tags": string[] (style/occasion, written in the target language),
    "brand": string (brand if a recognizable logo is detected, otherwise use the equivalent of "generic" in the target language),
    "material": string (material if identifiable, otherwise use the equivalent of "generic" in the target language),
    "notes": string (brief description of the item, 1-2 sentences, in the target language)
  },
  "reason": null
}

The "name" should be a brief, natural description in the target language, for example:
- English: "Green plaid shirt", "Led Zeppelin t-shirt", "Converse sneakers"
- Spanish: "Camisa verde a cuadros", "Camiseta de Led Zeppelin", "Tenis Converse"

Do not translate brand names.
Do not translate category values.
Do not mix languages in user-facing fields.

Example output for target language "en":

{
  "isGarment": true,
  "item": {
    "name": "Ribbed knit sweater",
    "category": "tops",
    "colors": ["#F5F0E8", "#C4B9A8", "#8B7355"],
    "tags": ["casual", "winter"],
    "brand": "Zara",
    "material": "80% cotton, 20% polyester",
    "notes": "A comfortable everyday sweater, great for layering."
  },
  "reason": null
}

Example output for target language "es":

{
  "isGarment": true,
  "item": {
    "name": "Suéter de punto acanalado",
    "category": "tops",
    "colors": ["#F5F0E8", "#C4B9A8", "#8B7355"],
    "tags": ["casual", "invierno"],
    "brand": "Zara",
    "material": "80% algodón, 20% poliéster",
    "notes": "Un suéter cómodo para el día a día, ideal para usar en capas."
  },
  "reason": null
}

Example output for a non-garment in Spanish:

{
  "isGarment": false,
  "item": null,
  "reason": "La imagen muestra un oso de peluche, no una prenda ni un accesorio."
}"
}`;
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
              content: SYSTEM_PROMPT
            },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64${image}` },
                },
                {
                  type: "text",
                  text: language
                }
              ],
            },
          ],
          "model": "qwen/qwen3.8-27b",
          "temperature": 1,
          "max_completion_tokens": 1000,
          "top_p": 1,
          "stream": false,
          "response_format": { "type": "json_object" },
          "stop": null,
        }),
      },
    );
    const data = await response.json();
    return Response.json({ aiAnswer: data }, {
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
