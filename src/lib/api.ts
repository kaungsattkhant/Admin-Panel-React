const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(phoneNumber: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        password: password,
      }),
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

       localStorage.setItem("auth", JSON.stringify(data));


    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err; // so your handleSubmit can catch it
  }
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsed = JSON.parse(authData);
      token = parsed.token;
    }
  }
  console.log('tokne is ',token);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API request failed");
  return data;
}

export async function logout() {
  return apiFetch("/logout", {
    method: "POST",
  });
}
