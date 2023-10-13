export interface Variety {
    varietyId?: number;
    productId?: number;
    description: string;
    file?: File | null;
    imageUrl: string | null; // Add imageUrl property
}