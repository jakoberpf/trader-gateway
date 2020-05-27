import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserGatewayTestModule } from '../../../../test.module';
import { UserAccountDetailComponent } from 'app/entities/userGateway/user-account/user-account-detail.component';
import { UserAccount } from 'app/shared/model/userGateway/user-account.model';

describe('Component Tests', () => {
  describe('UserAccount Management Detail Component', () => {
    let comp: UserAccountDetailComponent;
    let fixture: ComponentFixture<UserAccountDetailComponent>;
    const route = ({ data: of({ userAccount: new UserAccount('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserGatewayTestModule],
        declarations: [UserAccountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userAccount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userAccount).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
