import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TraderGatewayTestModule } from '../../../../test.module';
import { UserAccountComponent } from 'app/entities/userGateway/user-account/user-account.component';
import { UserAccountService } from 'app/entities/userGateway/user-account/user-account.service';
import { UserAccount } from 'app/shared/model/userGateway/user-account.model';

describe('Component Tests', () => {
  describe('UserAccount Management Component', () => {
    let comp: UserAccountComponent;
    let fixture: ComponentFixture<UserAccountComponent>;
    let service: UserAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TraderGatewayTestModule],
        declarations: [UserAccountComponent],
      })
        .overrideTemplate(UserAccountComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserAccountComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserAccountService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserAccount('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userAccounts && comp.userAccounts[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
