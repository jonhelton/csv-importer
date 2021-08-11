export class Camper { 
    make: string;
    brand: string;
    capacity: number;
    price: number;

    constructor(make: string, brand: string, capacity: number, price: number) {
        this.make = make;
        this.brand = brand;
        this.capacity = capacity;
        this.price = price;
    }

    equals(camper: Camper) { 
        return this.make === camper.make && 
                this.brand === camper.brand && 
                (this.capacity === camper.capacity || (isNaN(this.capacity) && isNaN(camper.capacity))) && 
                (this.price === camper.price || (isNaN(this.price) && isNaN(camper.price)));
    }
}