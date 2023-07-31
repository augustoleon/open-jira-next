import { FC, DragEvent, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)

    const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {
        event.dataTransfer.setData('text', entry._id)
        //modificamos el estado para indicar que estoy haciendo drag
        startDragging();
    };

    return (
        <Card
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
