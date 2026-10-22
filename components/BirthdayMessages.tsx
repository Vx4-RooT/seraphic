
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type BirthdayMessage = {
  id: number;
  nickname: string;
  message: string;
  created_at: string;
};

export default function BirthdayMessages() {
  const [messages, setMessages] = useState<BirthdayMessage[]>([]);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadMessages() {
    const { data, error } = await supabase
      .from("birthday_messages")
      .select("id, nickname, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      setError("Couldn't load messages. Please try again.");
    } else {
      setMessages(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadMessages();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanNickname = nickname.trim();
    const cleanMessage = message.trim();

    if (
      cleanNickname.length < 1 ||
      cleanNickname.length > 40 ||
      cleanMessage.length < 1 ||
      cleanMessage.length > 500
    ) {
      setError("Use a nickname up to 40 characters and a message up to 500.");
      return;
    }

    setSending(true);

    const { error } = await supabase
      .from("birthday_messages")
      .insert([{ nickname: cleanNickname, message: cleanMessage }]);

    if (error) {
      setError("Your message couldn't be saved. Please try again.");
    } else {
      setNickname("");
      setMessage("");
      setSuccess("Your birthday wish has been sent ✨");
      await loadMessages();
    }

    setSending(false);
  }

  return (
    <section id="messages" className="messages-section">
      <h2>Little Notes for Seraphic ✨</h2>
      <p>Leave a little birthday wish for her.</p>

      <form onSubmit={handleSubmit}>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Your nickname"
          maxLength={40}
          required
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a birthday wish..."
          maxLength={500}
          required
        />

        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send your wish ✨"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}
      {success && <p role="status">{success}</p>}

      <div className="messages-list">
        {loading ? (
          <p>Loading wishes...</p>
        ) : messages.length === 0 ? (
          <p>Be the first to leave a wish ✨</p>
        ) : (
          messages.map((item) => (
            <article className="message-card" key={item.id}>
              <h3>{item.nickname}</h3>
              <p>{item.message}</p>
              <time dateTime={item.created_at}>
                {new Date(item.created_at).toLocaleDateString()}
              </time>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
