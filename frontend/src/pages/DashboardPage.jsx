import useAuthStore from "@/store/auth.js";

function DashboardPage() {
  const { user, signOut } = useAuthStore();

  return (
    <div>
      Dashboard Page - Protected
      <h1>Welcome, {user?.displayName || user?.email}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default DashboardPage;
