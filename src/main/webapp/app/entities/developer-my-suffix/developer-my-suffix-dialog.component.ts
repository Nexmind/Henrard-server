import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DeveloperMySuffix } from './developer-my-suffix.model';
import { DeveloperMySuffixPopupService } from './developer-my-suffix-popup.service';
import { DeveloperMySuffixService } from './developer-my-suffix.service';
import { LanguageMySuffix, LanguageMySuffixService } from '../language-my-suffix';

@Component({
    selector: 'jhi-developer-my-suffix-dialog',
    templateUrl: './developer-my-suffix-dialog.component.html'
})
export class DeveloperMySuffixDialogComponent implements OnInit {

    developer: DeveloperMySuffix;
    isSaving: boolean;

    languages: LanguageMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private developerService: DeveloperMySuffixService,
        private languageService: LanguageMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.languageService.query()
            .subscribe((res: HttpResponse<LanguageMySuffix[]>) => { this.languages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.developer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.developerService.update(this.developer));
        } else {
            this.subscribeToSaveResponse(
                this.developerService.create(this.developer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DeveloperMySuffix>>) {
        result.subscribe((res: HttpResponse<DeveloperMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DeveloperMySuffix) {
        this.eventManager.broadcast({ name: 'developerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLanguageById(index: number, item: LanguageMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-developer-my-suffix-popup',
    template: ''
})
export class DeveloperMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private developerPopupService: DeveloperMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.developerPopupService
                    .open(DeveloperMySuffixDialogComponent as Component, params['id']);
            } else {
                this.developerPopupService
                    .open(DeveloperMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
