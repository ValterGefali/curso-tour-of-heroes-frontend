import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {

    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap((heroes) => this.log(`fetched heroes ${heroes.length} heroes`))
      );
  }

  getHero(id: number): Observable<Hero> {

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((hero) => this.log(`fetched hero id=${id} and name=${hero.name}`))
      );
  }





  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

}
