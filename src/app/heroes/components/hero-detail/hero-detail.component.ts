import { Component, OnInit } from "@angular/core";
import { HeroService } from "../../../core/services/hero.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Hero } from "../../../core/models/hero.model";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component(
  {
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss']

  })

export class HeroDetailComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  hero!: Hero;
  isEditing = false;

  form = this.fb.group({
    id: [{ value: '', disabled: true }],
    name: ['', [Validators.required, Validators.minLength(3)]]
  })



  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId != 'new') {
      this.isEditing = true;
      const id = Number(paramId);
      this.heroService.getHero(id).subscribe((hero) => {
        this.hero = hero;
        this.form.controls['id'].setValue(hero.id.toString());
        this.form.controls['name'].setValue(hero.name);
      });
    }

  }

  create(): void {
    //console.log(this.form);

    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        name: value.name!
      } as Hero;

      this.heroService.create(hero).subscribe(() => this.goBack());
    } else {
      this.showErrorMsg();
    }


  }

  update(): void {
    // console.log(this.form);

    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        id: this.hero.id,
        name: value.name!
      };

      this.heroService.update(hero).subscribe(() => this.goBack());
    } else {
      this.showErrorMsg();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private showErrorMsg(): void {
    this.snackBar.open('Please,check the erros found.', 'OK', { duration: 1500, verticalPosition: 'top' })
  }


}

