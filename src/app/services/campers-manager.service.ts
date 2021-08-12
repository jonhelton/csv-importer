import { Injectable } from "@angular/core";
import { Camper } from "../models";

@Injectable({ providedIn: 'root'})
export class CampersManager {
    public campers: Camper[];

    private delimeter = ',';
    private lineFeed = '\r\n';

    private rawData: string = '';
    private rows: string[] = [];

    constructor() {
        this.campers = [];
    }

    public importCampers(file: File) { 
        const reader: FileReader = new FileReader();

        reader.readAsText(file);
        reader.onload = (e) => {
            this.rawData = reader.result as string;

            const headers = this.rawData.substr(0, this.rawData.indexOf(this.lineFeed));
            this.rawData = this.rawData.replace(headers + this.lineFeed, '');
            this.rows = this.rawData.split(this.lineFeed);
            this.rows.pop();

            //For each row ( sans the header ) found in the CSV, generate a new Camper object and push into campers array
            this.rows.forEach(r => { 
                let cols = r.split(this.delimeter);
                this.campers.push(new Camper(cols[0], cols[1], +cols[2], +cols[3]));
            });

        }
    }
}