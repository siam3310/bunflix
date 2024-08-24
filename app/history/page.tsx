import HistoryPage from "@/components/history-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search History - Nextflix",
  description: "Nextflix clone built with Next.js and Tailwind CSS",
};

export default function History() {
  return <HistoryPage />;
}
