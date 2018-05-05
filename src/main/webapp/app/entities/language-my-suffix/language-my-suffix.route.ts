import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LanguageMySuffixComponent } from './language-my-suffix.component';
import { LanguageMySuffixDetailComponent } from './language-my-suffix-detail.component';
import { LanguageMySuffixPopupComponent } from './language-my-suffix-dialog.component';
import { LanguageMySuffixDeletePopupComponent } from './language-my-suffix-delete-dialog.component';

export const languageRoute: Routes = [
    {
        path: 'language-my-suffix',
        component: LanguageMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'language-my-suffix/:id',
        component: LanguageMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.language.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const languagePopupRoute: Routes = [
    {
        path: 'language-my-suffix-new',
        component: LanguageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.language.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'language-my-suffix/:id/edit',
        component: LanguageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.language.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'language-my-suffix/:id/delete',
        component: LanguageMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.language.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
