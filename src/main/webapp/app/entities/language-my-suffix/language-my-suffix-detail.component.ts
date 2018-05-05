import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageMySuffix } from './language-my-suffix.model';
import { LanguageMySuffixService } from './language-my-suffix.service';

@Component({
    selector: 'jhi-language-my-suffix-detail',
    templateUrl: './language-my-suffix-detail.component.html'
})
export class LanguageMySuffixDetailComponent implements OnInit, OnDestroy {

    language: LanguageMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private languageService: LanguageMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLanguages();
    }

    load(id) {
        this.languageService.find(id)
            .subscribe((languageResponse: HttpResponse<LanguageMySuffix>) => {
                this.language = languageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLanguages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'languageListModification',
            (response) => this.load(this.language.id)
        );
    }
}
