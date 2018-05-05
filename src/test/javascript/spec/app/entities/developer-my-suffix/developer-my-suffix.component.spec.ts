/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MycvTestModule } from '../../../test.module';
import { DeveloperMySuffixComponent } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.component';
import { DeveloperMySuffixService } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.service';
import { DeveloperMySuffix } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.model';

describe('Component Tests', () => {

    describe('DeveloperMySuffix Management Component', () => {
        let comp: DeveloperMySuffixComponent;
        let fixture: ComponentFixture<DeveloperMySuffixComponent>;
        let service: DeveloperMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [DeveloperMySuffixComponent],
                providers: [
                    DeveloperMySuffixService
                ]
            })
            .overrideTemplate(DeveloperMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeveloperMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeveloperMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DeveloperMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.developers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
