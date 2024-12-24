import { Component } from '@angular/core';
import { Abonnee } from '../../../models/abonnee';
import { Router } from '@angular/router';
import { AbonneeService } from '../../../services/abonnee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    abonnees: Abonnee[] = [];

    constructor(private abonneeService: AbonneeService, private router: Router) { }

    ngOnInit(): void {
      this.loadabonnees();
    }

    loadabonnees() {
      this.abonneeService.getAllabonnees().subscribe(data => {
        this.abonnees = data;
      });
    }


    deleteabonnee(abonnee: Abonnee) {
      this.abonneeService.deleteabonnee(abonnee.id).subscribe(() => {
        this.loadabonnees();
      });
    }
}
