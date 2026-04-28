
import { getCombinedBookings } from "@/lib/calendar";
import CalendarView from "@/components/CalendarView";
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const revalidate = 3600; 

export default async function ReservationPage() {
  const bookedDates = await getCombinedBookings();

  return (
    <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="eyebrow justify-center mb-4"><span className="rule mr-2" /> Disponibilités <span className="rule ml-2" /></span>
        <h1 className="text-4xl font-display italic">Réserver votre séjour</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <CalendarView bookedDates={bookedDates} />
        
        <div className="space-y-6">
          <h2 className="text-2xl font-display italic">Informations de réservation</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Les dates barrées sur le calendrier sont déjà réservées. Pour toute demande spécifique (privatisation, séjours longs), n'hésitez pas à nous contacter directement.
          </p>
          <div className="pt-6 border-t border-border">
             <a href="/contact" className="btn-hero w-full">Envoyer une demande directe</a>
          </div>
        </div>
      </div>
    </main>
  );
}