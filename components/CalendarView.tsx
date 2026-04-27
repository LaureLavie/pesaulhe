
"use client";
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { fr } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface Props {
  bookedDates: { start: Date; end: Date }[];
}

export default function CalendarView({ bookedDates }: Props) {
  const [range, setRange] = useState<any>();

  // Fonction pour vérifier si un jour est réservé
  const isDayBooked = (day: Date) => {
    return bookedDates.some(booking => 
      day >= booking.start && day < booking.end
    );
  };

  return (
    <div className="p-4 bg-white shadow-editorial border border-border">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        locale={fr}
        disabled={isDayBooked} // On bloque les dates
        modifiers={{ booked: isDayBooked }}
        modifiersClassNames={{
          booked: "bg-muted text-muted-foreground line-through opacity-50"
        }}
        classNames={{
          day_selected: "bg-accent text-white",
          head_cell: "eyebrow",
        }}
      />
      {range?.from && (
        <div className="mt-4 text-center">
          <p className="text-sm italic">
            Sélection : {range.from.toLocaleDateString()} 
            {range.to ? ` au ${range.to.toLocaleDateString()}` : ''}
          </p>
        </div>
      )}
    </div>
  );
}