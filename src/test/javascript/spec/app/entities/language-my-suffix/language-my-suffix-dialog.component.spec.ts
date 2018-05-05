/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MycvTestModule } from '../../../test.module';
import { LanguageMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix-dialog.component';
import { LanguageMySuffixService } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.service';
import { LanguageMySuffix } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.model';
import { DeveloperMySuffixService } from '../../../../../../main/webapp/app/entities/developer-my-suffix';

describe('Component Tests', () => {

    describe('LanguageMySuffix Management Dialog Component', () => {
        let comp: LanguageMySuffixDialogComponent;
        let fixture: ComponentFixture<LanguageMySuffixDialogComponent>;
        let service: LanguageMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [LanguageMySuffixDialogComponent],
                providers: [
                    DeveloperMySuffixService,
                    LanguageMySuffixService
                ]
            })
            .overrideTemplate(LanguageMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LanguageMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.language = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'languageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LanguageMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.language = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'languageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
