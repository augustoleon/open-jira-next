import { ChangeEvent, useMemo, useState } from 'react';
import { 
    capitalize, Button, Card, CardActions, 
    CardContent, CardHeader, FormControl, 
    FormControlLabel, FormLabel, Grid, Radio, 
    RadioGroup, TextField, IconButton 
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from '../../components/layouts'
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'done'];

export const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
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
        console.log({ inputValue, status });
        
    };
  return (
    <Layout title='entryById'>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada: ${ inputValue }`}
                        subheader={`Creada hace: ... minutos`}
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

        <IconButton sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            backgroundColor: 'red'
        }}>
            <DeleteOutlineOutlinedIcon/>
        </IconButton>
    </Layout>
  )
}

// las pages tienen que exportarse por defecto
export default EntryPage
