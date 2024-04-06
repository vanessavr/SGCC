import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from '@/components/ui/use-toast'

interface ErrorResponse {
    statusCode: number
    message: string
    errors: Array<{
        children: []
        constraints: {
            [key: string]: string
        }
        property: string
        message: string
    }>
}

export const handleErrorsToast = (response: ErrorResponse | null | undefined) => {
    if (response && response.errors && response.errors.length > 0) {
        toast({
            description: (
                <Accordion
                    type="single"
                    collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>✖️ Tiene {response.errors.length} errores en el formulario: Ver más</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc">
                                {response.errors.map((error, index) => (
                                    <li key={index}>
                                        {index + 1}. {Object.values(error.constraints)[0]}
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ),
        })
    } else {
        if (response) {
            toast({ title: '✖️', description: response.message })
        }
    }
}
