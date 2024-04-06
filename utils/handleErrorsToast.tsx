import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from '@/components/ui/use-toast'

interface ErrorResponse {
    statusCode: number
    message: Array<{ property: string; message: string }>
}

export const handleErrorsToast = (response: ErrorResponse | null | undefined) => {
    if (response && response.message.length > 0) {
        toast({
            description: (
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>✖️ Tiene {response.message.length} errores en el formulario: Ver más</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc">
                                {response.message.map((error, index) => (
                                    <li key={index}>{error.message}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ),
        })
    } else {
        toast({ title: '✖️', description: 'Error al guardar el ambiente' })
    }
}
