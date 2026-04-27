
import ical from 'node-ical';
import { isAfter, isBefore, startOfDay } from 'date-fns';

export interface BookedRange {
  start: Date;
  end: Date;
}

export async function getCombinedBookings(): Promise<BookedRange[]> {
  const urls = [
    process.env.AIRBNB_ICAL_URL, // Lien .ics Airbnb
    process.env.BOOKING_ICAL_URL  // Lien .ics Booking
  ].filter(Boolean) as string[];

  let allEvents: BookedRange[] = [];

  for (const url of urls) {
    try {
      const data = await ical.fromURL(url);
      const ranges = Object.values(data)
        .filter((event): event is any => event != null && (event as any).type === 'VEVENT')
        .map(event => ({
          start: startOfDay(new Date(event.start as Date)),
          end: startOfDay(new Date(event.end as Date)),
        }));
      allEvents = [...allEvents, ...ranges];
    } catch (error) {
      console.error(`Erreur lors de la récupération du calendrier : ${url}`, error);
    }
  }

  return allEvents;
}