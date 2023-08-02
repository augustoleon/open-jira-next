import { FC, DragEvent, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';

import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { useRouter } from 'next/router';

interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)
    const router = useRouter();

    const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {
        event.dataTransfer.setData('text', entry._id)
        //modificamos el estado para indicar que estoy haciendo drag
        startDragging();
    };

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
    }

    return (
        <Card
            onClick={ onClick }
            sx={{ marginBottom: 1}}
            draggable
            onDragStart={ onDragStart}
            onDragEnd={ endDragging }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
