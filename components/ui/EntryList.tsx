import { FC, DragEvent, useContext, useMemo } from 'react';
import { Paper, List } from '@mui/material'

import { UIContext } from '../../context/ui';
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

// Se define que el status siempre sea: pending, in-proress y done
export const EntryList:FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext) ;
  const { isDragging, endDragging } = useContext(UIContext)

  // useMemo: al menos que los entries cambien, no quiero volver a ejecutar este filtro
  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ), [ entries, status ]);

  const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
    const id = event.dataTransfer.getData('text'); 
    const entry = entries.find( e => e._id === id)!;
    entry.status = status;
    updateEntry( entry );
    endDragging();
  };

  const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
  };
  
  return (
    // div tag to do drop
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{ height: 'calc( 100vh - 180px )', backgroundColor: 'transparent', padding: '1px 5px' }}>
            <List sx={{opacity: isDragging ? .3 : 1, transition: 'all .3s'}}>
                {
                  entriesByStatus.map( entry => (
                   <EntryCard key={entry._id} entry={entry}/>
                  ))
                }
            </List>
        </Paper>
    </div>
  )
}
