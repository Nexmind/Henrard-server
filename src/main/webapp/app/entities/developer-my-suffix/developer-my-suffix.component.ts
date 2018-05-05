import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DeveloperMySuffix } from './developer-my-suffix.model';
import { DeveloperMySuffixService } from './developer-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-developer-my-suffix',
    templateUrl: './developer-my-suffix.component.html'
})
export class DeveloperMySuffixComponent implements OnInit, OnDestroy {
developers: DeveloperMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private developerService: DeveloperMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.developerService.query().subscribe(
            (res: HttpResponse<DeveloperMySuffix[]>) => {
                this.developers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDevelopers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DeveloperMySuffix) {
        return item.id;
    }
    registerChangeInDevelopers() {
        this.eventSubscriber = this.eventManager.subscribe('developerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
