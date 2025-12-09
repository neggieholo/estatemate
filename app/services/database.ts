
import { User, Role } from '../types';

interface UserRecord extends User {
  email: string; // Email is mandatory for DB records
  password?: string; // In a real app, this would be hashed. Storing plain for demo.
}


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const db = {
  // Authenticate user
  authenticate: async (email: string, password: string, type: "tenant" | "admin" = "tenant") => {
    const res = await fetch(`${baseUrl}/login/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include" // send cookies for session
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Login failed");
    }

    return await res.json(); // returns { success: true, user }
  },

  // Register user
  register: async (
  name: string,
  email: string,
  password: string,
) => {
  const body = { name, email, password };

  const res = await fetch(`${baseUrl}/register/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include"
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Admin registration failed");
  }

  return await res.json(); // { success: true, user }
},


  registerTenant: async (
  name: string,
  email: string,
  password: string,
  unit: string,
) => {
  const body = { name, email, password, unit };

  const res = await fetch(`${baseUrl}/register/tenant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include"
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Tenant registration failed");
  }

  return await res.json(); // { success: true, user }
},


  // Top-up wallet
  topUpWallet: async (userId: string, amount: number, type: "tenant" | "admin" = "tenant") => {
    const res = await fetch(`${baseUrl}/wallet/topup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, type }),
      credentials: "include"
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Top-up failed");
    }

    return await res.json(); // updated user
  },

  // Deduct wallet
  deductWallet: async (userId: string, amount: number, type: "tenant" | "admin" = "tenant") => {
    const res = await fetch(`${baseUrl}/wallet/deduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, type }),
      credentials: "include"
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Deduction failed");
    }

    return await res.json(); // updated user
  },

  // Get all users (admin-only)
  getAllUsers: async () => {
    const res = await fetch(`${baseUrl}/users`, { credentials: "include" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Could not fetch users");
    }
    return await res.json();
  }
};

