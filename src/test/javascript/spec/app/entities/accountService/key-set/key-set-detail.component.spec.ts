import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserGatewayTestModule } from '../../../../test.module';
import { KeySetDetailComponent } from 'app/entities/accountService/key-set/key-set-detail.component';
import { KeySet } from 'app/shared/model/accountService/key-set.model';

describe('Component Tests', () => {
  describe('KeySet Management Detail Component', () => {
    let comp: KeySetDetailComponent;
    let fixture: ComponentFixture<KeySetDetailComponent>;
    const route = ({ data: of({ keySet: new KeySet('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserGatewayTestModule],
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
