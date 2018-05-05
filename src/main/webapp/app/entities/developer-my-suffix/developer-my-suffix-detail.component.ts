import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DeveloperMySuffix } from './developer-my-suffix.model';
import { DeveloperMySuffixService } from './developer-my-suffix.service';

@Component({
    selector: 'jhi-developer-my-suffix-detail',
    templateUrl: './developer-my-suffix-detail.component.html'
})
export class DeveloperMySuffixDetailComponent implements OnInit, OnDestroy {

    developer: DeveloperMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private developerService: DeveloperMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDevelopers();
    }

    load(id) {
        this.developerService.find(id)
            .subscribe((developerResponse: HttpResponse<DeveloperMySuffix>) => {
                this.developer = developerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDevelopers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'developerListModification',
            (response) => this.load(this.developer.id)
        );
    }
}
