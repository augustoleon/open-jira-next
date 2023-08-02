import { isValidObjectId } from "mongoose"
import { db } from ".";
import { Entry, IEntry } from "../models";


export const getEntryById = async(id: string): Promise<IEntry | null> => {
    if( !isValidObjectId(id) ) return null;

    await db.connect(); 
    // el .lean trae la info minima necesaria.
    // se utiliza cuando queremos cargar menos volumen de data.
    const entry = await Entry.findById(id).lean();
    await db.connect(); 

    // serializamos la entry
    return JSON.parse( JSON.stringify(entry) );
}