import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MycvDeveloperMySuffixModule } from './developer-my-suffix/developer-my-suffix.module';
import { MycvSkillMySuffixModule } from './skill-my-suffix/skill-my-suffix.module';
import { MycvLanguageMySuffixModule } from './language-my-suffix/language-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MycvDeveloperMySuffixModule,
        MycvSkillMySuffixModule,
        MycvLanguageMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MycvEntityModule {}
