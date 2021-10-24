import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolFormComponent } from './symbol-form.component';

describe('SymbolFormComponent', () => {
  let component: SymbolFormComponent;
  let fixture: ComponentFixture<SymbolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
