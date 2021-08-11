import { Injectable } from "@angular/core";
import { Camper } from "../models";

@Injectable({ providedIn: 'root'})
export class CampersManager {
    private _campers: Camper[] = [];
    get Campers(): Camper[] { 
        return this._campers;
    }
    set Campers(value: Camper[]) { 
        this._campers = value;
    }
 
}