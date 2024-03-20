// components/ui/datepicker.tsx

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useEffect, useState } from 'react'

interface Props {
    placeholder: string
    name: string
    value?: string
    onChange?: (value: string) => void // Nueva prop para el cambio de fecha
}

export function DatePicker({ placeholder, name, value, onChange }: Props) {
    const [date, setDate] = useState<Date>()

    useEffect(() => {
        if (value) {
            const adjustedDate = new Date(value)

            setDate(new Date(adjustedDate.getTime() + adjustedDate.getTimezoneOffset() * 60 * 1000))
        }
    }, [value])

    // Función para manejar el cambio de fecha
    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        if (onChange && newDate) {
            onChange(newDate.toISOString()) // Convertir la fecha a formato ISO y llamar a la función onChange
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal rounded-full border-2', !date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
        </Popover>
    )
}
