import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MycvSharedModule } from '../../shared';
import {
    SkillMySuffixService,
    SkillMySuffixPopupService,
    SkillMySuffixComponent,
    SkillMySuffixDetailComponent,
    SkillMySuffixDialogComponent,
    SkillMySuffixPopupComponent,
    SkillMySuffixDeletePopupComponent,
    SkillMySuffixDeleteDialogComponent,
    skillRoute,
    skillPopupRoute,
} from './';

const ENTITY_STATES = [
    ...skillRoute,
    ...skillPopupRoute,
];

@NgModule({
    imports: [
        MycvSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SkillMySuffixComponent,
        SkillMySuffixDetailComponent,
        SkillMySuffixDialogComponent,
        SkillMySuffixDeleteDialogComponent,
        SkillMySuffixPopupComponent,
        SkillMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SkillMySuffixComponent,
        SkillMySuffixDialogComponent,
        SkillMySuffixPopupComponent,
        SkillMySuffixDeleteDialogComponent,
        SkillMySuffixDeletePopupComponent,
    ],
    providers: [
        SkillMySuffixService,
        SkillMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MycvSkillMySuffixModule {}
