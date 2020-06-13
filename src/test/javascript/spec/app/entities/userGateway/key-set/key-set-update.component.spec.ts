import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TraderGatewayTestModule } from '../../../../test.module';
import { KeySetUpdateComponent } from 'app/entities/userGateway/key-set/key-set-update.component';
import { KeySetService } from 'app/entities/userGateway/key-set/key-set.service';
import { KeySet } from 'app/shared/model/userGateway/key-set.model';

describe('Component Tests', () => {
  describe('KeySet Management Update Component', () => {
    let comp: KeySetUpdateComponent;
    let fixture: ComponentFixture<KeySetUpdateComponent>;
    let service: KeySetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TraderGatewayTestModule],
        declarations: [KeySetUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(KeySetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeySetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeySetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new KeySet('123');
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
        const entity = new KeySet();
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
