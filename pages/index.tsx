import { CardHeader, Grid, Card } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJita'>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title="Pendientes" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title="En Progenso" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc( 100vh - 100px)' }}>
            <CardHeader title="Completadas" />
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}

export default HomePage;

// MUI trabaja first-mobile, lo que definamos en el 
// breakpoint 'xs' lo heredaran todos los tipos de pantalla
// al menos que definamos lo contrario con otro tipo de breakpoint.
// definimos los breakpoints en el componente xs sm 

// sx, extended style, no confundir con el breakpoint 'xs'
