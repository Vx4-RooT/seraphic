
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

type Props = {
  onVerified: () => void;
};

type SpeechResultEvent = {
  resultIndex: number;
  results: ArrayLike<{
    0: { transcript: string };
    isFinal: boolean;
  }>;
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export default function VoiceVerification({
  onVerified,
}: Props) {
  const [question, setQuestion] = useState(
    "What makes Seraphic special to you?"
  );
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/verify-voice")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Could not load the question.");
        }

        return response.json();
      })
      .then((data: { question?: string }) => {
        if (!cancelled && data.question) {
          setQuestion(data.question);
        }
      })
      .catch(() => {
        // Keep the fallback question visible.
      });

    return () => {
      cancelled = true;
      recognitionRef.current?.abort();
    };
  }, []);

  function startListening() {
    if (listening || checking) return;

    setError("");
    setFeedback("");
    setTranscript("");

    const browser = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    const Recognition =
      browser.SpeechRecognition ??
      browser.webkitSpeechRecognition;

    if (!Recognition) {
      setError(
        "Speech recognition isn't supported by this browser. Try Chrome on HTTPS."
      );
      return;
    }

    try {
      const recognition = new Recognition();

      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = false;


recognition.onresult = (event) => {
  let spoken = "";

  for (let i = 0; i < event.results.length; i++) {
    spoken += event.results[i][0].transcript + " ";
  }

  setTranscript(spoken.trim());
};

recognition.onerror = (event) => {
  setListening(false);
  recognitionRef.current = null;

  if (event.error === "not-allowed") {
    setError(
      "Microphone access was denied. Allow microphone access and try again."
    );
  } else if (event.error === "no-speech") {
    setError("We didn't hear anything. Please try again.");
  } else if (event.error !== "aborted") {
    setError("We couldn't recognize your answer. Please try again.");
  }
};

recognition.onend = () => {
  setListening(false);
  recognitionRef.current = null;
};


      recognitionRef.current = recognition;
      setListening(true);
      recognition.start();
    } catch {
      setListening(false);
      setError("Couldn't start the microphone. Please try again.");
    }
  }


async function verifyAnswer() {
  const answer = transcript.trim();

  if (!answer || checking || listening) return;

  setChecking(true);
  setError("");
  setFeedback("");

  try {
    const response = await fetch("/api/verify-voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript: answer }),
    });

    const data: {
      passed?: boolean;
      message?: string;
      error?: string;
    } = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ?? "Verification failed. Please try again."
      );
    }

    if (data.passed === true) {
      setError("");
      setFeedback("");
      onVerified();
      return;
    }

    // Wrong answer: show a message and keep the gate locked.
    setFeedback("");
    setError("✨ Not quite, stardust... Try again. 💜");
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Verification is temporarily unavailable."
    );
  } finally {
    setChecking(false);
  }
}


  return (
    <main className="voice-gate-page">
      <div className="voice-stars" aria-hidden="true">
        {Array.from({ length: 45 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 61 + 7) % 100}%`,
              animationDelay: `${(i % 8) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <section className="voice-verification">
        <div className="voice-orb" aria-hidden="true">
          {listening ? (
            <Mic size={30} className="voice-pulse" />
          ) : (
            <LockKeyhole size={30} />
          )}
        </div>

        <p className="voice-eyebrow">
          A LITTLE QUESTION FOR YOU
        </p>

        <h1>
          Before you enter,
          <br />
          <em>listen to the stars.</em>
        </h1>

        <p className="voice-question">{question}</p>

        <p className="voice-hint">
          Speak in English, in your own words.
        </p>

        <button
          type="button"
          className="voice-button"
          onClick={startListening}
          disabled={listening || checking}
        >
          {listening ? (
            <>
              <MicOff size={18} />
              Listening…
            </>
          ) : (
            <>
              <Mic size={18} />
              Speak your answer
            </>
          )}
        </button>


{listening && (
  <button
    type="button"
    className="voice-stop"
    onClick={() => {
      try {
        recognitionRef.current?.stop();
      } catch {
        setListening(false);
        setError("Couldn't finish recording. Please try again.");
      }
    }}
  >
    Finish recording
  </button>
)}


        {transcript && (
          <div className="voice-transcript">
            <span>Your answer</span>
            <p>{transcript}</p>

            <button
              type="button"
              className="voice-button"
              onClick={verifyAnswer}
              disabled={checking || listening}
            >
              {checking ? (
                <>
                  <Sparkles size={17} />
                  Reading the stars…
                </>
              ) : (
                "Check my answer"
              )}
            </button>
          </div>
        )}

        {feedback && (
          <p className="voice-feedback" role="status">
            {feedback}
          </p>
        )}

        {error && (
          <p className="voice-error" role="alert">
            {error}
          </p>
        )}

        <p className="voice-footer">
          ✧ SOME DOORS OPEN WITH THE RIGHT WORDS ✧
        </p>
      </section>
    </main>
  );
}
