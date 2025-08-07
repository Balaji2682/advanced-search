import { Component } from '@angular/core';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdvancedSearchComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
