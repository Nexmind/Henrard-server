import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LanguageMySuffix } from './language-my-suffix.model';
import { LanguageMySuffixService } from './language-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-language-my-suffix',
    templateUrl: './language-my-suffix.component.html'
})
export class LanguageMySuffixComponent implements OnInit, OnDestroy {
languages: LanguageMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private languageService: LanguageMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.languageService.query().subscribe(
            (res: HttpResponse<LanguageMySuffix[]>) => {
                this.languages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLanguages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LanguageMySuffix) {
        return item.id;
    }
    registerChangeInLanguages() {
        this.eventSubscriber = this.eventManager.subscribe('languageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
