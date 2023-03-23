import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }


  getHero(id: number): Observable<Hero> {

    return this.http
      .get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((hero) => this.log(`fetched ${this.descAttributes(hero)}`))
      );
  }

  getHeroes(): Observable<Hero[]> {

    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap((heroes) => this.log(`fetched heroes ${heroes.length} heroes`))
      );
  }


  create(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(
        tap((hero) =>
          this.log(`create ${this.descAttributes(hero)}`))
      );

  }

  update(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.heroesUrl}/${hero.id}`, hero)
      .pipe(
        tap((hero) =>
          this.log(`update ${this.descAttributes(hero)}`))
      );

  }

  delete(hero: Hero): Observable<any> {
    return this.http
      .delete<any>(this.getUrl(hero.id))
      .pipe(tap(() => this.log(`deleted ${this.descAttributes(hero)}`)));

  }
  getUrl(id: number): string {
    return `${this, this.heroesUrl}/${id}`;
  }


  private descAttributes(hero: Hero): string {
    return `id=${hero.id} and name=${hero.name}`;
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  //GET /Heroes?name=ter (query string)
  search(term: string): Observable<Hero[]> {
    if (!term.trim())
      return of([]);

    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((heroes) =>

          heroes.length
            ? this.log(`found ${heroes.length} hero(es) matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ));


  }

}
