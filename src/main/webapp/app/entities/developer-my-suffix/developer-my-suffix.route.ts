import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DeveloperMySuffixComponent } from './developer-my-suffix.component';
import { DeveloperMySuffixDetailComponent } from './developer-my-suffix-detail.component';
import { DeveloperMySuffixPopupComponent } from './developer-my-suffix-dialog.component';
import { DeveloperMySuffixDeletePopupComponent } from './developer-my-suffix-delete-dialog.component';

export const developerRoute: Routes = [
    {
        path: 'developer-my-suffix',
        component: DeveloperMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'developer-my-suffix/:id',
        component: DeveloperMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const developerPopupRoute: Routes = [
    {
        path: 'developer-my-suffix-new',
        component: DeveloperMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'developer-my-suffix/:id/edit',
        component: DeveloperMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'developer-my-suffix/:id/delete',
        component: DeveloperMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
