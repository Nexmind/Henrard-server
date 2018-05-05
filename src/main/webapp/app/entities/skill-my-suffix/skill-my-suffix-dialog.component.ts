import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SkillMySuffix } from './skill-my-suffix.model';
import { SkillMySuffixPopupService } from './skill-my-suffix-popup.service';
import { SkillMySuffixService } from './skill-my-suffix.service';
import { DeveloperMySuffix, DeveloperMySuffixService } from '../developer-my-suffix';

@Component({
    selector: 'jhi-skill-my-suffix-dialog',
    templateUrl: './skill-my-suffix-dialog.component.html'
})
export class SkillMySuffixDialogComponent implements OnInit {

    skill: SkillMySuffix;
    isSaving: boolean;

    developers: DeveloperMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private skillService: SkillMySuffixService,
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
        if (this.skill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skillService.update(this.skill));
        } else {
            this.subscribeToSaveResponse(
                this.skillService.create(this.skill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SkillMySuffix>>) {
        result.subscribe((res: HttpResponse<SkillMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SkillMySuffix) {
        this.eventManager.broadcast({ name: 'skillListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-skill-my-suffix-popup',
    template: ''
})
export class SkillMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillPopupService: SkillMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skillPopupService
                    .open(SkillMySuffixDialogComponent as Component, params['id']);
            } else {
                this.skillPopupService
                    .open(SkillMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
