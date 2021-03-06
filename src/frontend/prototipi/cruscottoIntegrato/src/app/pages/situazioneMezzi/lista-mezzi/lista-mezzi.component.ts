import { Component, OnInit } from '@angular/core';
import { ListaMezziService } from "./lista-mezzi.service";
import { MezzoInServizio } from "../mezzoinservizio/mezzoinservizio.model";

@Component({
  selector: 'app-lista-mezzi',
  templateUrl: './lista-mezzi.component.html',
  styleUrls: ['./lista-mezzi.component.css']
})
export class ListaMezziComponent implements OnInit {
  private mezzi: MezzoInServizio[];
  constructor(private listaMezziService: ListaMezziService) { }

  ngOnInit() {
    this.listaMezziService.getMezzi().subscribe(
      mezzi => {
        this.mezzi = mezzi;
      }
    )
  }

}
