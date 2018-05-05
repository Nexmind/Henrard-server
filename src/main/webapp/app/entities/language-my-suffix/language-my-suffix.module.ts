import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MycvSharedModule } from '../../shared';
import {
    LanguageMySuffixService,
    LanguageMySuffixPopupService,
    LanguageMySuffixComponent,
    LanguageMySuffixDetailComponent,
    LanguageMySuffixDialogComponent,
    LanguageMySuffixPopupComponent,
    LanguageMySuffixDeletePopupComponent,
    LanguageMySuffixDeleteDialogComponent,
    languageRoute,
    languagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...languageRoute,
    ...languagePopupRoute,
];

@NgModule({
    imports: [
        MycvSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LanguageMySuffixComponent,
        LanguageMySuffixDetailComponent,
        LanguageMySuffixDialogComponent,
        LanguageMySuffixDeleteDialogComponent,
        LanguageMySuffixPopupComponent,
        LanguageMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LanguageMySuffixComponent,
        LanguageMySuffixDialogComponent,
        LanguageMySuffixPopupComponent,
        LanguageMySuffixDeleteDialogComponent,
        LanguageMySuffixDeletePopupComponent,
    ],
    providers: [
        LanguageMySuffixService,
        LanguageMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MycvLanguageMySuffixModule {}
