export function serializeFormData(formData: FormData): Record<string, string | number | File | Date> {
    const fields: Record<string, string | number | File | Date> = {}

    formData.forEach((value, key) => {
        if (value instanceof File) {
            // Si el valor es un archivo, lo asignamos directamente al campo
            fields[key] = value
        } else if (!isNaN(Date.parse(value as string))) {
            // Si el campo es una fecha y el valor es una fecha válida, lo asignamos como objeto Date
            fields[key] = new Date(value as string)
        } else {
            // Si no es un archivo ni una fecha válida, intentamos convertirlo a número si es posible
            const numberValue = parseFloat(value as string)
            // Si la conversión es exitosa y no es NaN, guardamos el número; de lo contrario, guardamos el valor como una cadena
            fields[key] = isNaN(numberValue) ? value : numberValue
        }
    })

    return fields
}
