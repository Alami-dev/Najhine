// app/page.tsx

import { redirect } from "next/navigation";

export default function HomePage() {
  // redirige immédiatement vers la landing page
  redirect("/landing");
  return null;
}
