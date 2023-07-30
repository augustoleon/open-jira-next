import { FC, useContext, useMemo } from 'react';
import { Paper, List } from '@mui/material'

import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'

interface Props {
  status: EntryStatus;
}

// Se define que el status siempre sea: pending, in-proress y done
export const EntryList:FC<Props> = ({ status }) => {

  const { entries } = useContext(EntriesContext) ;
  // Al menos que los entries cambies, no quiero volver a ejecutar este filtro
  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ), [ entries, status ])
  
  return (
    // div tag to do drop
    <div>
        <Paper sx={{ height: 'calc( 100vh - 180px )', backgroundColor: 'transparent', padding: '1px 5px' }}>
            <List sx={{opacity: 1}}>
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
