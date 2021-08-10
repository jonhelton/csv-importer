import { Component, OnInit } from '@angular/core';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  finalHeaders: string[] = [];
  finalData: {}[] = [];
  changeListener($event: any): void { 
    const files = $event.target.files;
    console.log(files);
    if(files && files.length > 0) {
       let file : File =  files.item(0); 
        //  console.log(file?.name);
        //  console.log(file?.size);
        //  console.log(file?.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
        reader.onload = (e) => {
           let csv: string = reader.result as string;
           let headers = csv.substr(0, csv.indexOf('\r\n'));
           

           csv = csv.replace(headers + '\r\n', '');

           this.finalHeaders = headers.split(',');
          // console.log(csv);
           let rows = csv.split('\r\n');

           let obj = {};
           let data = rows.map(row => { 
             let cols = row.split(',');
             

              cols.forEach((c, index) => { 
               obj = { 
                 ...obj,
                [this.finalHeaders[index]]:c
               }
             });

             return obj;
          
           })

           this.finalData = data;
           console.log(this.finalData[0][Object.getOwnPropertyNames(this.finalData)[0]]);


          // rows.forEach(r => {  let col = r.split(',');  headers.split(',').reduce(a => {console.log(a); return a}  ) } )


           // console.log(object1);
         }
      }
    }

    buildTable(data: {}) { 
    }
}
