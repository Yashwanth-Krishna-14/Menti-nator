"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    bio: "",
    role: "",
    education: "",
    industry: "",
    linkedin: "",
  });

  // 🔹 Load Profile from Supabase & Local Storage
  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      if (data?.user) {
        setUser(data.user);
        setProfile((prev) => ({ ...prev, email: data.user.email || "" }));

        // 🔹 Fetch profile from Supabase if exists
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
        } else if (profileData) {
          setProfile(profileData);
          localStorage.setItem("profile", JSON.stringify(profileData)); // Sync localStorage
        }
      }
    }

    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    fetchUser();
  }, []);

  // 🔹 Handle Profile Save to Supabase
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      alert("No user logged in");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.from("user_profiles").upsert({
      ...profile,
      user_id: user.id,
    });

    setLoading(false);

    if (error) {
      console.error("Error saving profile:", error.message);
      alert("Failed to save profile");
    } else {
      alert("Profile saved successfully!");
      localStorage.setItem("profile", JSON.stringify(profile)); // Only update localStorage if successful
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email (Read-only)"
          value={profile.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-200"
        />
        <textarea
          placeholder="Short Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select your current role/status</option>
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Education"
          value={profile.education}
          onChange={(e) => setProfile({ ...profile, education: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={profile.industry}
          onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select your industry interest</option>
          <option value="Tech & AI">Tech & AI</option>
          <option value="Business">Business</option>
          <option value="Career">Career</option>
        </select>
        <input
          type="url"
          placeholder="LinkedIn Profile URL"
          value={profile.linkedin}
          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
