import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TraderGatewayTestModule } from '../../../../test.module';
import { KeySetComponent } from 'app/entities/userGateway/key-set/key-set.component';
import { KeySetService } from 'app/entities/userGateway/key-set/key-set.service';
import { KeySet } from 'app/shared/model/userGateway/key-set.model';

describe('Component Tests', () => {
  describe('KeySet Management Component', () => {
    let comp: KeySetComponent;
    let fixture: ComponentFixture<KeySetComponent>;
    let service: KeySetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TraderGatewayTestModule],
        declarations: [KeySetComponent],
      })
        .overrideTemplate(KeySetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeySetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeySetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new KeySet('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.keySets && comp.keySets[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
