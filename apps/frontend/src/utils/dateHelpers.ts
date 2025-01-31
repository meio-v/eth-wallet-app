export function getAgeString(timestamp: string): string {
  const now = Date.now()
  const past = new Date(timestamp).getTime()
  const diffInSeconds = Math.floor((now - past) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  return `${diffInMinutes} minutes ago`
}