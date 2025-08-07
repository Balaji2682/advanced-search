import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faLocationDot, faFont } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    SelectModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    FontAwesomeModule
  ],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.scss'
})
export class AdvancedSearchComponent {
  @Output() apply = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  faPlus = faPlus;
  faTrash = faTrash;
  faLocationDot = faLocationDot;
  faFont = faFont;

  config = {
    fields: [
      { label: 'Address', value: 'address', icon: this.faLocationDot },
      { label: 'Product Name', value: 'productName', icon: this.faFont }
    ],
    operators: [
      { label: 'contains', value: 'contains' },
      { label: 'equals', value: 'equals' }
    ],
    match: [
      { label: 'all', value: 'all' },
      { label: 'any', value: 'any' }
    ],
    dates: [
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last 7 days', value: 'last7' },
      { label: 'Custom Date', value: 'custom' }
    ]
  };

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [''],
      match: [true],
      matchType: ['all'],
      rules: this.fb.array([]),
      dateRange: this.fb.group({
        type: ['today'],
        from: [new Date('2018-01-22')],
        to: [new Date('2018-01-22')]
      }),
      saveFilter: [false]
    });
    this.addRule();
  }

  get rules(): FormArray {
    return this.form.get('rules') as FormArray;
  }

  addRule(index?: number): void {
    const group = this.fb.group({
      field: [this.config.fields[0].value],
      operator: [this.config.operators[0].value],
      value: ['']
    });
    if (index === undefined || index >= this.rules.length) {
      this.rules.push(group);
    } else {
      this.rules.insert(index, group);
    }
  }

  removeRule(index: number): void {
    this.rules.removeAt(index);
  }

  onApply(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const result = {
        ...value,
        dateRange: {
          ...value.dateRange,
          from: this.formatDate(value.dateRange.from),
          to: this.formatDate(value.dateRange.to)
        }
      };
      this.apply.emit(result);
    }
  }

  onCancel(): void {
    this.form.reset({
      search: '',
      match: true,
      matchType: 'all',
      dateRange: { type: 'today', from: new Date('2018-01-22'), to: new Date('2018-01-22') },
      saveFilter: false
    });
    this.rules.clear();
    this.addRule();
    this.cancel.emit();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
