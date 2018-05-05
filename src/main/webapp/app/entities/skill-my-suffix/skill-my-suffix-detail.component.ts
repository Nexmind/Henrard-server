import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SkillMySuffix } from './skill-my-suffix.model';
import { SkillMySuffixService } from './skill-my-suffix.service';

@Component({
    selector: 'jhi-skill-my-suffix-detail',
    templateUrl: './skill-my-suffix-detail.component.html'
})
export class SkillMySuffixDetailComponent implements OnInit, OnDestroy {

    skill: SkillMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private skillService: SkillMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSkills();
    }

    load(id) {
        this.skillService.find(id)
            .subscribe((skillResponse: HttpResponse<SkillMySuffix>) => {
                this.skill = skillResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'skillListModification',
            (response) => this.load(this.skill.id)
        );
    }
}
