import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="min-h-screen bg-black" />;
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user.email !== "pradyaviation@gmail.com") {
        await auth.signOut();
        setError("Access denied. You are not an admin.");
      }
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] rounded-xl border border-[#1a1a1a] bg-[#0B0B0B] p-8">
        <h1 className="font-heading text-2xl text-white text-center mb-2">AIRAVATH Admin</h1>
        <p className="text-[#777] text-sm text-center mb-8">Sign in to manage your website</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 rounded-lg border border-[#222] bg-black px-4 text-white placeholder:text-[#555] focus:outline-none focus:border-[#00D9FF] transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 rounded-lg border border-[#222] bg-black px-4 text-white placeholder:text-[#555] focus:outline-none focus:border-[#00D9FF] transition-colors"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-lg bg-[#00D9FF] text-black font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
