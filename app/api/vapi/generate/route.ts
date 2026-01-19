import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json({ success: true, data: "THANK YOU" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } =
    await request.json();

  try {
    const { text: questions } = await generateText({
      model: groq("llama-3.1-8b-instant"), 
      prompt: `
Return ONLY valid JSON array.
No explanation. No markdown.

Format:
["Question 1", "Question 2", "Question 3"]

Job role: ${role}
Experience level: ${level}
Tech stack: ${techstack}
Question type bias: ${type}
Number of questions: ${amount}

Rules:
- Voice friendly
- No special characters like / * #
`
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    // ⚠️ spelling fix: interviews
    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
