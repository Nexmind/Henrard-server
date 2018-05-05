/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MycvTestModule } from '../../../test.module';
import { LanguageMySuffixComponent } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.component';
import { LanguageMySuffixService } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.service';
import { LanguageMySuffix } from '../../../../../../main/webapp/app/entities/language-my-suffix/language-my-suffix.model';

describe('Component Tests', () => {

    describe('LanguageMySuffix Management Component', () => {
        let comp: LanguageMySuffixComponent;
        let fixture: ComponentFixture<LanguageMySuffixComponent>;
        let service: LanguageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [LanguageMySuffixComponent],
                providers: [
                    LanguageMySuffixService
                ]
            })
            .overrideTemplate(LanguageMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LanguageMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.languages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
