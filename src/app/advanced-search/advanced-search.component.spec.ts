import { TestBed } from '@angular/core/testing';
import { AdvancedSearchComponent } from './advanced-search.component';

describe('AdvancedSearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSearchComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdvancedSearchComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
