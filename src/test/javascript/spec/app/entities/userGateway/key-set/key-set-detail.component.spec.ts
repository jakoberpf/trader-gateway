import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TraderGatewayTestModule } from '../../../../test.module';
import { KeySetDetailComponent } from 'app/entities/userGateway/key-set/key-set-detail.component';
import { KeySet } from 'app/shared/model/userGateway/key-set.model';

describe('Component Tests', () => {
  describe('KeySet Management Detail Component', () => {
    let comp: KeySetDetailComponent;
    let fixture: ComponentFixture<KeySetDetailComponent>;
    const route = ({ data: of({ keySet: new KeySet('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TraderGatewayTestModule],
        declarations: [KeySetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(KeySetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KeySetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load keySet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.keySet).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
