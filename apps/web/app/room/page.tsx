import Socket from "@/components/Socket"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>
}) {
  const roomId = (await searchParams).id

  if (!roomId) {
    return <div>No room Id provided</div>
  }

  return (
    <div>
      <Socket roomId={roomId} />
    </div>
  )
}
