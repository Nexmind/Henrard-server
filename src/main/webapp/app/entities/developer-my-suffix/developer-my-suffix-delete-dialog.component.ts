import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DeveloperMySuffix } from './developer-my-suffix.model';
import { DeveloperMySuffixPopupService } from './developer-my-suffix-popup.service';
import { DeveloperMySuffixService } from './developer-my-suffix.service';

@Component({
    selector: 'jhi-developer-my-suffix-delete-dialog',
    templateUrl: './developer-my-suffix-delete-dialog.component.html'
})
export class DeveloperMySuffixDeleteDialogComponent {

    developer: DeveloperMySuffix;

    constructor(
        private developerService: DeveloperMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.developerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'developerListModification',
                content: 'Deleted an developer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-developer-my-suffix-delete-popup',
    template: ''
})
export class DeveloperMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private developerPopupService: DeveloperMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.developerPopupService
                .open(DeveloperMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
