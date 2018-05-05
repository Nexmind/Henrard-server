import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SkillMySuffixComponent } from './skill-my-suffix.component';
import { SkillMySuffixDetailComponent } from './skill-my-suffix-detail.component';
import { SkillMySuffixPopupComponent } from './skill-my-suffix-dialog.component';
import { SkillMySuffixDeletePopupComponent } from './skill-my-suffix-delete-dialog.component';

export const skillRoute: Routes = [
    {
        path: 'skill-my-suffix',
        component: SkillMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'skill-my-suffix/:id',
        component: SkillMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skillPopupRoute: Routes = [
    {
        path: 'skill-my-suffix-new',
        component: SkillMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skill-my-suffix/:id/edit',
        component: SkillMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skill-my-suffix/:id/delete',
        component: SkillMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mycvApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
