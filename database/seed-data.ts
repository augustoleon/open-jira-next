
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData:SeedData = {
    entries: [
        {
            description: 'Una línea de descripción pendiente',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Una línea de descripción en progreso',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Una línea de descripción finalizada',
            status: 'done',
            createdAt: Date.now() - 100000,
        }
    ]
}