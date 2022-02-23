export interface Weather{
    weather: weather[];
}

interface weather{
    id: number;
    main: string;
    description: string;
    icon: string;
}