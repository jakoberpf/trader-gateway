import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserGatewayTestModule } from '../../../../test.module';
import { KeyCollectionComponent } from 'app/entities/accountService/key-collection/key-collection.component';
import { KeyCollectionService } from 'app/entities/accountService/key-collection/key-collection.service';
import { KeyCollection } from 'app/shared/model/accountService/key-collection.model';

describe('Component Tests', () => {
  describe('KeyCollection Management Component', () => {
    let comp: KeyCollectionComponent;
    let fixture: ComponentFixture<KeyCollectionComponent>;
    let service: KeyCollectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserGatewayTestModule],
        declarations: [KeyCollectionComponent],
      })
        .overrideTemplate(KeyCollectionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeyCollectionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeyCollectionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new KeyCollection('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.keyCollections && comp.keyCollections[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
