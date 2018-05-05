/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MycvTestModule } from '../../../test.module';
import { SkillMySuffixComponent } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix.component';
import { SkillMySuffixService } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix.service';
import { SkillMySuffix } from '../../../../../../main/webapp/app/entities/skill-my-suffix/skill-my-suffix.model';

describe('Component Tests', () => {

    describe('SkillMySuffix Management Component', () => {
        let comp: SkillMySuffixComponent;
        let fixture: ComponentFixture<SkillMySuffixComponent>;
        let service: SkillMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [SkillMySuffixComponent],
                providers: [
                    SkillMySuffixService
                ]
            })
            .overrideTemplate(SkillMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SkillMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.skills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
