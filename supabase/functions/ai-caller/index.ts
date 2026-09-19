import "@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
  if (req.method === "OPTIONS") {
    console.log("patata");
    return new Response("ok", { headers: corsHeaders });
  } else {
    const { image } = await req.json();
    const SYSTEM_PROMPT: string =
      `You are a clothing and accessory classifier. Analyze the image and respond ONLY with a valid JSON object, with no additional text before or after, no markdown, no explanations.

First determine whether the image shows a recognizable clothing item or accessory: shirts, t-shirts, pants, dresses, shoes, coats, bags, bras, bracelets, rings, belts, etc.

If it is NOT a clothing item/accessory (for example: toys, animals, people, food, electronic devices, body parts with no visible clothing), respond exactly in this shape:
{
  "isGarment": false,
  "item": null,
  "reason": "brief explanation of what was detected instead"
}

If it IS a valid clothing item/accessory, respond exactly in this shape:
{
  "isGarment": true,
  "item": {
    "name": string,
    "category": exactly one of: "tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories",
    "colors": string[] (2-3 main colors in hexadecimal format, up to 6 if the item is extremely multicolored),
    "tags": string[] (style/occasion, e.g: casual, elegant, summer, winter, work, sport),
    "brand": string (brand if a recognizable logo is detected, otherwise "generic"),
    "material": string (material if identifiable, otherwise "generic"),
    "notes": string (brief description of the item, 1-2 sentences)
  },
  "reason": null
}

The "name" should be a brief, natural description, for example: "Green plaid shirt", "Led Zeppelin t-shirt", "Converse sneakers", "Brahma boots", "Skull ring", "Gold bracelet".

Example outputs:

{
  "isGarment": true,
  "item": {
    "name": "Ribbed knit sweater",
    "category": "tops",
    "colors": ["#F5F0E8", "#C4B9A8", "#8B7355"],
    "tags": ["casual", "winter"],
    "brand": "Zara",
    "material": "80% Cotton, 20% Polyester",
    "notes": "Comfortable everyday sweater, great for layering."
  },
  "reason": null
}

{
  "isGarment": true,
  "item": {
    "name": "Satin button-up shirt",
    "category": "tops",
    "colors": ["#8FAF8F"],
    "tags": ["work", "spring", "minimal"],
    "brand": "Massimo Dutti",
    "material": "100% Polyester",
    "notes": "Lightweight and silky feel. Perfect for work or dinner outings."
  },
  "reason": null
}

{
  "isGarment": true,
  "item": {
    "name": "Classic trench coat",
    "category": "outerwear",
    "colors": ["#C4A882", "#D4B896"],
    "tags": ["work", "casual", "autumn"],
    "brand": "Mango",
    "material": "65% Polyester, 35% Cotton",
    "notes": "Timeless trench, works for both office and weekend."
  },
  "reason": null
}

{
  "isGarment": false,
  "item": null,
  "reason": "The image shows a stuffed teddy bear, not a piece of clothing."
}`;
    console.log(image);
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
              content: [
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64${image}` },
                },
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
    console.log(typeof data);
    console.log(data);
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
