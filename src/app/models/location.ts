export interface Location {
    id: number; // Id de la localización
    name: string; // Nombre de la localización
    type: string; // Tipo de localización
    dimension: string; // Dimensión de la localización
    residents: string[]; // Lista de personajes
    url: string; // URL de la localización
    created: string; // Fecha de creación en la base de datos
}
