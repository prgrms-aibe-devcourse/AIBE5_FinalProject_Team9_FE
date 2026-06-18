import { redirect } from "next/navigation";

export default function MyReservationsPage() {
  redirect("/mypage?tab=reservation");
}
