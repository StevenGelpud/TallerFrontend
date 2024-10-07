import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdopcionesComponent } from './lista-adopciones.component';

describe('ListaAdopcionesComponent', () => {
  let component: ListaAdopcionesComponent;
  let fixture: ComponentFixture<ListaAdopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAdopcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
