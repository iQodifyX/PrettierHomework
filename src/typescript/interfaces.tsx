interface Event {
  timestamp: {seconds: number, nanoseconds: number},
  date: number,
  state: boolean,
  title: string,
  description: string,
  color: string,
  id: string,
  url?: string,
  label?: string,
}

export type { Event }