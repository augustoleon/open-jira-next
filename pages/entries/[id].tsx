import { ChangeEvent, useMemo, useState, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { 
    capitalize, Button, Card, CardActions, 
    CardContent, CardHeader, FormControl, 
    FormControlLabel, FormLabel, Grid, Radio, 
    RadioGroup, TextField, IconButton 
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts'
import { Entry, EntryStatus } from '../../interfaces';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'done'];

interface Props{
    entry: Entry;
}

export const EntryPage:FC<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry, refreshEntries } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>( entry.status );
    const [touched, setTouched] = useState(false);

    // nos pide como primer parametro el proceso que queremos memorizar
    // el segundo valor son las dependencias que va a tener para volver a memorizar en caso de que las mismas cambien
    const isNotValid = useMemo( () => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
        // setTouched(false);
    };

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {        
        setStatus( event.target.value as EntryStatus);
    };

    const onSave = () => {
        if(inputValue.trim().length === 0 ) return;
        
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        };

        updateEntry( updatedEntry, true );
        refreshEntries();
    };
  return (
    <Layout title={ inputValue.substring(0,20) + '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada:`}
                        subheader={`Creada hace: ${ dateFunctions.getFormatDistanceToNow( entry.createdAt )}`}
                    />
                    <CardContent>
                        <TextField
                            sx={{ marginTop:2, marginBottom: 1 }}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={ inputValue }
                            onBlur={() => setTouched(true) }
                            onChange={ onInputValueChanged }
                            helperText={isNotValid && 'Ingrese un valor'}
                            error={ isNotValid }
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={ status }
                                onChange={ onStatusChanged }
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio/>}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlinedIcon/> }
                            variant='contained'
                            fullWidth
                            onClick={onSave}
                            disabled={ inputValue.length <= 0 }
                        >
                            Guardar 
                        </Button>
                    </CardActions>
                </Card>

            </Grid>
        </Grid>

        <IconButton 
            sx={{
                position: 'fixed',
                bottom: 40,
                right: 40,
                backgroundColor: 'red'
            }}
            onClick={() => deleteEntry( entry._id )}
        >
            <DeleteOutlineOutlinedIcon/>
        </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    if( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    };
    
    return {
        props: {
            entry
        }
    }
}

// las pages tienen que exportarse por defecto
export default EntryPage
