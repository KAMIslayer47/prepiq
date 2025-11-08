// src/lib/api.ts

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://themes-barry-nursing-electrical.trycloudflare.com";
const API_KEY = import.meta.env.VITE_API_KEY || "JEE_SECRET_KEY_123";

export interface QueryRequest {
  question: string;
  user_id?: string;
  session_id?: string;
}

export interface QueryResponse {
  answer: string;
  sources?: string[];
  confidence?: number;
}

export async function askLLM(payload: QueryRequest): Promise<QueryResponse> {
  try {
    const response = await fetch(`${API_BASE}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("LLM API Error:", error);
    throw error;
  }
}
