import { AuthProvider } from "@/(providers)/auth-provider";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
