import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiBarmanService {

  api_url = "https://www.thecocktaildb.com/api/json/v1/1/";

  constructor(private http: HttpClient) { }

  searchCocktailByName(nomCocktail: string): Observable<any> {
    return this.http.get<any>(this.api_url + "search.php?s=" + nomCocktail);
  }

  allCocktailsByfirstLetter(letter: string): Observable<any> {
    return this.http.get<any>(this.api_url + "search.php?f=" + letter.charAt(0));
  }

  searchIngredientByName(ingredient: string): Observable<any> {
    return this.http.get<any>(this.api_url + "search.php?i=" + ingredient);
  }
}
