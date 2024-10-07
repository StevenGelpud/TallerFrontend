import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdopcionesComponent } from './editar-adopciones.component';

describe('EditarAdopcionesComponent', () => {
  let component: EditarAdopcionesComponent;
  let fixture: ComponentFixture<EditarAdopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAdopcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
