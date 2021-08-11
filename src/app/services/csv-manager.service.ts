import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Camper } from "../models";

@Injectable({ providedIn: 'root'})
export class CsvManager {
    campers: Camper[] = [];
    public campers$: BehaviorSubject<Camper[]>;;

    private delimeter = ',';
    private lineFeed = '\r\n';

    private rawData: string = '';
    private rows: string[] = [];

    constructor() {
        this.campers$ = new BehaviorSubject(this.campers);
    }

    public removeCamper(camper: Camper) { 
        console.log(camper);
        console.log(this.campers);
        this.campers = this.campers.filter(c => !c.equals(camper));
        this.campers$.next(this.campers);
    }

    public importCampers(file: File): Observable<Camper[]> { 
            
            const reader: FileReader = new FileReader();

            reader.readAsText(file);
            reader.onload = (e) => {
                this.rawData = reader.result as string;

                const headers = this.rawData.substr(0, this.rawData.indexOf(this.lineFeed));
                this.rawData = this.rawData.replace(headers + this.lineFeed, '');
                this.rows = this.rawData.split(this.lineFeed);

                this.rows.forEach(r => { 
                    let cols = r.split(this.delimeter);
                  
                    this.campers.push(new Camper(cols[0], cols[1], +cols[2], +cols[3]));
                });

             }
             
        return of(this.campers);
    }

    export() { 

    }
}