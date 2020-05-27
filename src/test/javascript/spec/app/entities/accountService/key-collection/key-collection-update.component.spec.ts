import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserGatewayTestModule } from '../../../../test.module';
import { KeyCollectionUpdateComponent } from 'app/entities/accountService/key-collection/key-collection-update.component';
import { KeyCollectionService } from 'app/entities/accountService/key-collection/key-collection.service';
import { KeyCollection } from 'app/shared/model/accountService/key-collection.model';

describe('Component Tests', () => {
  describe('KeyCollection Management Update Component', () => {
    let comp: KeyCollectionUpdateComponent;
    let fixture: ComponentFixture<KeyCollectionUpdateComponent>;
    let service: KeyCollectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserGatewayTestModule],
        declarations: [KeyCollectionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(KeyCollectionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeyCollectionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeyCollectionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new KeyCollection('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new KeyCollection();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
