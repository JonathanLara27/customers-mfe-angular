import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UpsertCustomerDialogComponent } from './upsert-customer-dialog.component';
import { UpsertCustomerDialogService } from './upsert-customer-dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('UpsertCustomerDialogComponent', () => {
    let fixture: ComponentFixture<UpsertCustomerDialogComponent>;
    let component: UpsertCustomerDialogComponent;
    let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UpsertCustomerDialogComponent>>;

    const mockData = {
        customer: { id: 1, name: 'Juan Pérez', email: 'juan@mail.com', phone: '+51999999999' }
    };

    beforeEach(waitForAsync(() => {
        dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

        TestBed.configureTestingModule({
            imports: [
                UpsertCustomerDialogComponent,
                CommonModule,
                ReactiveFormsModule,
                MatDialogModule
            ],
            providers: [
                UpsertCustomerDialogService,
                provideAnimations(),
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                { provide: MatDialogRef, useValue: dialogRefSpy }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpsertCustomerDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // dispara ngOnInit y setFormToEdit
    });

    it('should create component and initialize form with data', () => {
        expect(component).toBeTruthy();
        expect(component.formCustomer.value.name).toBe('Juan Pérez');
        expect(component.formCustomer.value.email).toBe('juan@mail.com');
    });

    it('should mark form invalid if name is empty', () => {
        component.formCustomer.controls['name'].setValue('');
        expect(component.formCustomer.invalid).toBeTrue();
    });

    it('should close dialog with correct data on submitForm', () => {
        component.submitForm();
        expect(dialogRefSpy.close).toHaveBeenCalledWith({
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@mail.com',
            phone: '+51999999999'
        });
    });

    it('should reset form using service', () => {
        component.upsertCustomerDialogService.resetForm();
        expect(component.formCustomer.value.name).toBe('');
    });
});
