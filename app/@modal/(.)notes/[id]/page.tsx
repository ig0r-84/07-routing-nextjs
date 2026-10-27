import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import NoteDetailsModal from "./NoteDetailsModal";

interface NoteModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsModal />
    </HydrationBoundary>
  );
}
