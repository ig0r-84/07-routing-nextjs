import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const { search = "", page = "1" } = await searchParams;
  const currentPage = Number(page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", search, currentPage],
    queryFn: () => fetchNotes(search, currentPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient search={search} page={currentPage} />
    </HydrationBoundary>
  );
}
