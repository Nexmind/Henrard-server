import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MycvSharedModule } from '../../shared';
import {
    DeveloperMySuffixService,
    DeveloperMySuffixPopupService,
    DeveloperMySuffixComponent,
    DeveloperMySuffixDetailComponent,
    DeveloperMySuffixDialogComponent,
    DeveloperMySuffixPopupComponent,
    DeveloperMySuffixDeletePopupComponent,
    DeveloperMySuffixDeleteDialogComponent,
    developerRoute,
    developerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...developerRoute,
    ...developerPopupRoute,
];

@NgModule({
    imports: [
        MycvSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeveloperMySuffixComponent,
        DeveloperMySuffixDetailComponent,
        DeveloperMySuffixDialogComponent,
        DeveloperMySuffixDeleteDialogComponent,
        DeveloperMySuffixPopupComponent,
        DeveloperMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DeveloperMySuffixComponent,
        DeveloperMySuffixDialogComponent,
        DeveloperMySuffixPopupComponent,
        DeveloperMySuffixDeleteDialogComponent,
        DeveloperMySuffixDeletePopupComponent,
    ],
    providers: [
        DeveloperMySuffixService,
        DeveloperMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MycvDeveloperMySuffixModule {}
