/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MycvTestModule } from '../../../test.module';
import { DeveloperMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix-delete-dialog.component';
import { DeveloperMySuffixService } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.service';

describe('Component Tests', () => {

    describe('DeveloperMySuffix Management Delete Component', () => {
        let comp: DeveloperMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DeveloperMySuffixDeleteDialogComponent>;
        let service: DeveloperMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [DeveloperMySuffixDeleteDialogComponent],
                providers: [
                    DeveloperMySuffixService
                ]
            })
            .overrideTemplate(DeveloperMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeveloperMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeveloperMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
