/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MycvTestModule } from '../../../test.module';
import { DeveloperMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix-detail.component';
import { DeveloperMySuffixService } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.service';
import { DeveloperMySuffix } from '../../../../../../main/webapp/app/entities/developer-my-suffix/developer-my-suffix.model';

describe('Component Tests', () => {

    describe('DeveloperMySuffix Management Detail Component', () => {
        let comp: DeveloperMySuffixDetailComponent;
        let fixture: ComponentFixture<DeveloperMySuffixDetailComponent>;
        let service: DeveloperMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MycvTestModule],
                declarations: [DeveloperMySuffixDetailComponent],
                providers: [
                    DeveloperMySuffixService
                ]
            })
            .overrideTemplate(DeveloperMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeveloperMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeveloperMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DeveloperMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.developer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
