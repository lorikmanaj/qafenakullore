export interface Variety {
    varietyId?: number;
    productId?: number;
    description: string;
    file?: File | null;
    imageUrl: string; // Add imageUrl property
    imageBlob: string;

    //Change
    imageBase64?: string[];
}