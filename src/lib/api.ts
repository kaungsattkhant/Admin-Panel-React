const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(phoneNumber: string, password: string) {
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

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let token: string | null = null;

  // only read localStorage in browser
  if (typeof window !== "undefined") {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      token = parsedAuthData.token;
    }
  }

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

  //  if (res.status === 401) {
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem("token"); // optional: clear token
  //     window.location.href = "/signin";  // redirect
  //   }
  //   return; // stop execution
  // }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

export async function logout() {
  return apiFetch("/logout", {
    method: "POST",
  });
}
