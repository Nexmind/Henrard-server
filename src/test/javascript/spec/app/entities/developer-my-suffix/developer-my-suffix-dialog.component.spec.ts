/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MycvTestModule } from '../../../test.module';
import { DeveloperMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix-dialog.component';
import { DeveloperMySuffixService } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.service';
import { DeveloperMySuffix } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.model';
import { LanguageMySuffixService } from '../../../../../../main/webapp/app/entities/language-my-suffix';

describe('Component Tests', () => {

    describe('DeveloperMySuffix Management Dialog Component', () => {
        let comp: DeveloperMySuffixDialogComponent;
        let fixture: ComponentFixture<DeveloperMySuffixDialogComponent>;
        let service: DeveloperMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [DeveloperMySuffixDialogComponent],
                providers: [
                    LanguageMySuffixService,
                    DeveloperMySuffixService
                ]
            })
            .overrideTemplate(DeveloperMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeveloperMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeveloperMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DeveloperMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.developer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'developerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DeveloperMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.developer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'developerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
