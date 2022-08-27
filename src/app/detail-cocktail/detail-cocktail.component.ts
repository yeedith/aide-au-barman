import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cocktail } from '../models/cocktail';

@Component({
  selector: 'app-detail-cocktail',
  templateUrl: './detail-cocktail.component.html',
  styleUrls: ['./detail-cocktail.component.css']
})
export class DetailCocktailComponent implements OnInit, OnChanges {
  // permet de récupérer la valeur passé au composant dans le html
  @Input("valeur")
  valeur!: Cocktail;
  constructor() { }

  // permet d'écouter les évènements derrière le changement sur le composant
  ngOnChanges(changes: SimpleChanges): void {
    this.valeur = changes['valeur'].currentValue;
  }

  ngOnInit(): void {
  }



}
