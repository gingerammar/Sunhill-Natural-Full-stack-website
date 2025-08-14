export class Product {
    constructor(
        public id: number,
        public name: string,
        public categoryId: number, // or ProductCategory if you're sending the full object
        public weight: number,
        public unitOfWeight: string,
        public amount: number,
        public description: string,
        public notes: string | null,
        public dimensions: string | null,
        public dimensionsMetric: string | null,
        public orderMinimumQuantity: boolean,
        public orderMultipleQuantity: boolean,
        public containerMinQty: boolean,
        public onHandQuantity: number,
        public upc: string,
        public basePrice: number,
        public priceLevel1: number,
        public priceLevel2: number,
        public priceLevel3: number,
        public priceLevel4: number,
        public priceLevel5: number,
        public priceLevel6: boolean,
        public priceLevel7: number,
        public priceLevel8: number,
        public specialPrice: boolean,
        public additionalPhotos: string | null,
        public photoName: number,
        public source: string | null,
        public isDeleted: string,
        public additionalImageCount: string | null
    ) {

    }
}
