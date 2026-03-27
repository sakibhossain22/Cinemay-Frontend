import AdminMediaLibrary from "@/components/movie/Movies";

export default async function MediaPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    const queryString = new URLSearchParams();
    if (params.searchTerm) queryString.set("searchTerm", params.searchTerm as string);
    if (params.isPremium) queryString.set("isPremium", params.isPremium as string);
    if (params.sortBy) queryString.set("sortBy", params.sortBy as string);
    if (params.page) queryString.set("page", params.page as string);
    if (params.category) queryString.set("category", params.category as string);
    if (params.type) queryString.set("type", params.type as string);
    if (params.genre) queryString.set("genre", params.genre as string);

    queryString.set("limit", "10");

    const res = await fetch(`${process.env.API_URL}/media/all-media?${queryString.toString()}`, {
        cache: 'no-store'
    });
    const initialData = await res.json();
    console.log()
    return <AdminMediaLibrary initialData={initialData} />;
}