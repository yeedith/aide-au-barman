import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Cocktail } from '../models/cocktail';
import { ApiBarmanService } from '../service/api-barman.service';

@Component({
  selector: 'app-form-recherche',
  templateUrl: './form-recherche.component.html',
  styleUrls: ['./form-recherche.component.css']
})
export class FormRechercheComponent implements OnInit {

  listeCocktails: Cocktail[] = [];
  cocktailsSelectionnes: Cocktail[] = [];
  formulaireDeRecherche!: FormGroup;
  formulaireDeSelection!: FormGroup;

  estValidee = false;
  calculFait = false;
  prixTotal = 0;

  constructor(private formBuilder: FormBuilder, private barmanService: ApiBarmanService) { }

  ngOnInit(): void {
    this.formulaireDeRecherche = new FormGroup({
      "cocktail": new FormControl('', [])
    });
    this.formulaireDeSelection = this.formBuilder.group({
      listeDeChoix: new FormArray([])
    });
  }

  rechercher(): void {
    // A chaque nouvelle recherche, on vide les deux listes 
    this.listeCocktails = [];
    this.cocktailsSelectionnes = [];
    this.estValidee = false;
    this.calculFait = false;

    let cocktailSaisie = this.formulaireDeRecherche.get('cocktail')?.value;
    // si on a plus d'un caractère saisi, on recherche un cocktail précis
    // observable sur les cocktails
    let obs = null;
    if(cocktailSaisie.length > 1){
       obs = this.barmanService.searchCocktailByName(cocktailSaisie);
    }else{
      obs = this.barmanService.allCocktailsByfirstLetter(cocktailSaisie);
    }
    obs.subscribe(data => {
      // on récupère la variable drinks
      let drinks: Cocktail[] = data['drinks'];
      // on parcours chaque élément dans le tableau drinks
      drinks.forEach((element: { [x: string]: any; }) => {
        // on va convertir chaque élément en un cocktail pour l'afficher
        let ingredients = [];
        ingredients.push(element['strIngredient1']);
        ingredients.push(element['strIngredient2']);
        ingredients.push(element['strIngredient3']);
        ingredients.push(element['strIngredient4']);
        ingredients.push(element['strIngredient5']);
        ingredients.push(element['strIngredient6']);

        let cocktail: Cocktail = {
          idDrink: element['idDrink'],
          strDrink: element['strDrink'],
          strIngredients: ingredients
        }

        this.listeCocktails.push(cocktail);
      });
    });
  }

  valider(): void {
    this.estValidee = true;
  }

  ajouterOuRetirer(index: number): void {
    // on récupère l'index de l'élement sélection: -1 s'il n'existe pas
    const itemIndex = this.cocktailsSelectionnes.indexOf(this.listeCocktails[index]);
    if (itemIndex == -1) {
      // on ajoute le cocktail à la liste
      this.cocktailsSelectionnes.push(this.listeCocktails[index]);
    } else {
      // on rétire le cocktail de la liste
      this.cocktailsSelectionnes.splice(itemIndex, 1);
    }
  }

  calculerCout(): void {
    // on va parcourir chaque cocktail, et pour chacun d'eux on va parcourir ses ingredients et additionner le prix
    this.cocktailsSelectionnes.forEach(selection => {
      selection.strIngredients.forEach(ingredient => {
        // observable sur l'ingredient
        const obs = this.barmanService.searchIngredientByName(ingredient);
        obs.subscribe(reponse => {
          // si on a un résultat sur l'ingrédient et que le prix est différent de null
          if(reponse['ingredients'] !== null && reponse['ingredients'][0]['strABV']){
            this.prixTotal += Number(reponse['ingredients'][0]['strABV']);
          }
        });
        this.calculFait = true;
      });
    });
  }
}
