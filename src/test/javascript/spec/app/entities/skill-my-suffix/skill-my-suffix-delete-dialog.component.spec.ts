/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MycvTestModule } from '../../../test.module';
import { SkillMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix-delete-dialog.component';
import { SkillMySuffixService } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix.service';

describe('Component Tests', () => {

    describe('SkillMySuffix Management Delete Component', () => {
        let comp: SkillMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SkillMySuffixDeleteDialogComponent>;
        let service: SkillMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [SkillMySuffixDeleteDialogComponent],
                providers: [
                    SkillMySuffixService
                ]
            })
            .overrideTemplate(SkillMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillMySuffixService);
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
