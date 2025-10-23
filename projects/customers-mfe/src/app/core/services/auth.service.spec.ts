import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService (unit)', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
        });
        service = TestBed.inject(AuthService);
    });

    it('should start unauthenticated', () => {
        expect(service.currenUser()).toBeFalse(); // leer signal llamándolo
    });

    it('login() should set authenticated true', () => {
        service.login();
        expect(service.currenUser()).toBeTrue();
    });

    it('logout() should set authenticated false', () => {
        service.login();
        expect(service.currenUser()).toBeTrue();
        service.logout();
        expect(service.currenUser()).toBeFalse();
    });
});
