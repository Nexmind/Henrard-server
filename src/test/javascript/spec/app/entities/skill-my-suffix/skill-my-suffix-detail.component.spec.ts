/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MycvTestModule } from '../../../test.module';
import { SkillMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix-detail.component';
import { SkillMySuffixService } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix.service';
import { SkillMySuffix } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix.model';

describe('Component Tests', () => {

    describe('SkillMySuffix Management Detail Component', () => {
        let comp: SkillMySuffixDetailComponent;
        let fixture: ComponentFixture<SkillMySuffixDetailComponent>;
        let service: SkillMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [SkillMySuffixDetailComponent],
                providers: [
                    SkillMySuffixService
                ]
            })
            .overrideTemplate(SkillMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SkillMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.skill).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
