/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MycvTestModule } from '../../../test.module';
import { LanguageMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix-delete-dialog.component';
import { LanguageMySuffixService } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.service';

describe('Component Tests', () => {

    describe('LanguageMySuffix Management Delete Component', () => {
        let comp: LanguageMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LanguageMySuffixDeleteDialogComponent>;
        let service: LanguageMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [LanguageMySuffixDeleteDialogComponent],
                providers: [
                    LanguageMySuffixService
                ]
            })
            .overrideTemplate(LanguageMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageMySuffixService);
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
