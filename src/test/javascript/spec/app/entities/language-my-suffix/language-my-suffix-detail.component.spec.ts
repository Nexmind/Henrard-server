/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MycvTestModule } from '../../../test.module';
import { LanguageMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix-detail.component';
import { LanguageMySuffixService } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.service';
import { LanguageMySuffix } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.model';

describe('Component Tests', () => {

    describe('LanguageMySuffix Management Detail Component', () => {
        let comp: LanguageMySuffixDetailComponent;
        let fixture: ComponentFixture<LanguageMySuffixDetailComponent>;
        let service: LanguageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [LanguageMySuffixDetailComponent],
                providers: [
                    LanguageMySuffixService
                ]
            })
            .overrideTemplate(LanguageMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LanguageMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.language).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
