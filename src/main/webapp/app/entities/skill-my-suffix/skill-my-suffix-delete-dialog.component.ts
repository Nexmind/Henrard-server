import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SkillMySuffix } from './skill-my-suffix.model';
import { SkillMySuffixPopupService } from './skill-my-suffix-popup.service';
import { SkillMySuffixService } from './skill-my-suffix.service';

@Component({
    selector: 'jhi-skill-my-suffix-delete-dialog',
    templateUrl: './skill-my-suffix-delete-dialog.component.html'
})
export class SkillMySuffixDeleteDialogComponent {

    skill: SkillMySuffix;

    constructor(
        private skillService: SkillMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.skillService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'skillListModification',
                content: 'Deleted an skill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-skill-my-suffix-delete-popup',
    template: ''
})
export class SkillMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillPopupService: SkillMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.skillPopupService
                .open(SkillMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
