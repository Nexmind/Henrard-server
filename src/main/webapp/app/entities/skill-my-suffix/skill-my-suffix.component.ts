import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SkillMySuffix } from './skill-my-suffix.model';
import { SkillMySuffixService } from './skill-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-skill-my-suffix',
    templateUrl: './skill-my-suffix.component.html'
})
export class SkillMySuffixComponent implements OnInit, OnDestroy {
skills: SkillMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private skillService: SkillMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.skillService.query().subscribe(
            (res: HttpResponse<SkillMySuffix[]>) => {
                this.skills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSkills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SkillMySuffix) {
        return item.id;
    }
    registerChangeInSkills() {
        this.eventSubscriber = this.eventManager.subscribe('skillListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
