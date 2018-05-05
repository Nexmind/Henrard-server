import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageMySuffix } from './language-my-suffix.model';
import { LanguageMySuffixPopupService } from './language-my-suffix-popup.service';
import { LanguageMySuffixService } from './language-my-suffix.service';

@Component({
    selector: 'jhi-language-my-suffix-delete-dialog',
    templateUrl: './language-my-suffix-delete-dialog.component.html'
})
export class LanguageMySuffixDeleteDialogComponent {

    language: LanguageMySuffix;

    constructor(
        private languageService: LanguageMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.languageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'languageListModification',
                content: 'Deleted an language'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-language-my-suffix-delete-popup',
    template: ''
})
export class LanguageMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languagePopupService: LanguageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.languagePopupService
                .open(LanguageMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
