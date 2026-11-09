import { NextResponse } from "next/server";
import stringSimilarity from "string-similarity";

export const runtime = "nodejs";

const expectedAnswers = [
  "you make me happy",
  "you are special to me",
  "you bring joy into my life",
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function checkAnswer(transcript: string): boolean {
  const spoken = normalize(transcript);

  return expectedAnswers.some((expected) => {
    const similarity = stringSimilarity.compareTwoStrings(
      spoken,
      normalize(expected)
    );

    return similarity >= 0.65;
  });
}

export async function GET() {
  return NextResponse.json({
    question:
      process.env.SERAPHIC_VOICE_QUESTION ??
      "What makes Seraphic special to you?",
  });
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("transcript" in body) ||
      typeof body.transcript !== "string"
    ) {
      return NextResponse.json(
        { error: "A spoken answer is required." },
        { status: 400 }
      );
    }

    const transcript = body.transcript.trim().slice(0, 500);

    if (transcript.length < 3) {
      return NextResponse.json(
        { error: "Please say a little more." },
        { status: 400 }
      );
    }

    const passed = checkAnswer(transcript);

    return NextResponse.json({
      passed,
      message: passed
        ? "The stars recognize you ✨"
        : "✨ Not quite, stardust... Try again. 💜",
    });
  } catch (error) {
    console.error("Voice verification failed:", error);

    return NextResponse.json(
      { error: "Verification is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}