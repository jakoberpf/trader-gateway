import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TraderGatewayTestModule } from '../../../../test.module';
import { KeyCollectionDetailComponent } from 'app/entities/accountService/key-collection/key-collection-detail.component';
import { KeyCollection } from 'app/shared/model/accountService/key-collection.model';

describe('Component Tests', () => {
  describe('KeyCollection Management Detail Component', () => {
    let comp: KeyCollectionDetailComponent;
    let fixture: ComponentFixture<KeyCollectionDetailComponent>;
    const route = ({ data: of({ keyCollection: new KeyCollection('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TraderGatewayTestModule],
        declarations: [KeyCollectionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(KeyCollectionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KeyCollectionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load keyCollection on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.keyCollection).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
