import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from 'src/app/core/models/dialog-data-model';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];


  constructor(private heroService: HeroService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHeroes();
  }


  onSelected(hero: Hero): void {
    this.delete(hero);
  }


  getHeroes(): void {

    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {

    const dialogData: DialogData =
    {
      cancelText: 'Cancel',
      ConfirmText: 'Delete',
      context: `Delete '${hero.name}?'`
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { width: '300px', data: dialogData });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.heroService.delete(hero).subscribe(() => {
          //this.heroes = this.heroes.filter((h => h != hero));
          this.getHeroes();
        })
      }
    });
  }

}
