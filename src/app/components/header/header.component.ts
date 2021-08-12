import { Component, OnInit } from '@angular/core';
import { CampersManager } from 'src/app/services/campers-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private camperService: CampersManager) { }

  ngOnInit(): void {
  }

  changeListener($event: any): void { 
    const files: FileList = $event.target.files;

    if (files && files.length > 0) {
      const file: File =  files.item(0) as File;
      this.camperService.importCampers(file);
    } 
  }

}
