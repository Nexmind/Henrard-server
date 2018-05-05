import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LanguageMySuffix } from './language-my-suffix.model';
import { LanguageMySuffixPopupService } from './language-my-suffix-popup.service';
import { LanguageMySuffixService } from './language-my-suffix.service';
import { DeveloperMySuffix, DeveloperMySuffixService } from '../developer-my-suffix';

@Component({
    selector: 'jhi-language-my-suffix-dialog',
    templateUrl: './language-my-suffix-dialog.component.html'
})
export class LanguageMySuffixDialogComponent implements OnInit {

    language: LanguageMySuffix;
    isSaving: boolean;

    developers: DeveloperMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private languageService: LanguageMySuffixService,
        private developerService: DeveloperMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.developerService.query()
            .subscribe((res: HttpResponse<DeveloperMySuffix[]>) => { this.developers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.language.id !== undefined) {
            this.subscribeToSaveResponse(
                this.languageService.update(this.language));
        } else {
            this.subscribeToSaveResponse(
                this.languageService.create(this.language));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LanguageMySuffix>>) {
        result.subscribe((res: HttpResponse<LanguageMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LanguageMySuffix) {
        this.eventManager.broadcast({ name: 'languageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDeveloperById(index: number, item: DeveloperMySuffix) {
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
    selector: 'jhi-language-my-suffix-popup',
    template: ''
})
export class LanguageMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languagePopupService: LanguageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.languagePopupService
                    .open(LanguageMySuffixDialogComponent as Component, params['id']);
            } else {
                this.languagePopupService
                    .open(LanguageMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
