import { LoaderFunction, redirect } from "@remix-run/node";
import { createClerkClient } from "@clerk/remix/api.server";
import { User, getAuth } from "@clerk/remix/ssr.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  const { users } = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  if (!userId) {
    return redirect("/");
  }

  const user = await users.getUser(userId);

  return { user };
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome, {user.id}
      </p>
    </div>
  );
}
