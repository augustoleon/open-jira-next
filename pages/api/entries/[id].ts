import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ message: 'El id no es valido'});
    };

    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res );
        case 'GET':
            return getEntry( req, res );
        case 'DELETE':
            return deleteEntry( req, res );
        default:
            return res.status(400).json({ message: 'Método no existe' + req.method });
    };
};

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;

    await db.connect();

    // buscamos el id
    const entryInDB = await Entry.findById(id);
    await db.disconnect();
    
    // consultamos si el entryInDB es null
    if( !entryInDB ){
        return res.status(400).json({ message: 'No hay entrada con ese ID'});
    };

    res.status(200).json( entryInDB )
};

const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    // buscamos el id
    const entryToUpdate = await Entry.findById(id);

    // consultamos si el entryToUpdate es null
    if( !entryToUpdate ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID'});
    };

    // Si viene la descripción usamos la entrante, caso contrario usamos la descripción existente
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;


    try {
        // runValidators para que revise que el estado sea uno de los estados permitidos en nuestra enumeración
        // new para que nos mande y regrese la info actualizada
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true } );
        await db.disconnect();

        // Indicamos con el signo de admiración que el dato siempre tendrá un valor
        res.status(200).json( updatedEntry! );

    } catch (error: any) {
        console.log({ error });
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message})
    };
};

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();

    // buscamos el id
    const entryToDelete = await Entry.findById(id);

    // consultamos si el entryToUpdate es null
    if( !entryToDelete ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID'});
    };

    try {
        // runValidators para que revise que el estado sea uno de los estados permitidos en nuestra enumeración
        // new para que nos mande y regrese la info actualizada
        await Entry.findByIdAndDelete( id, { runValidators: true, new: true } );
        await db.disconnect();

        // Indicamos con el signo de admiración que el dato siempre tendrá un valor
        res.status(200).json( { message: "Entrada eliminada con exito"} );

    } catch (error: any) {
        console.log({ error });
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message})
    };
}
