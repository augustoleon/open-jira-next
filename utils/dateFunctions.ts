import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'

export const getFormatDistanceToNow = ( date: number ) => {
    const fromNow = formatDistanceToNow( date, { locale: es } )
    return `${fromNow.replace('alrededor de','')}` // replace minute with min for better
}