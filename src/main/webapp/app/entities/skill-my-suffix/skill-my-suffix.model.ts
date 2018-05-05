import { BaseEntity } from './../../shared';

export const enum Technology {
    'IOS',
    'ANDROID',
    'NODEJS',
    'JHIPSTER',
    'ANGULAR',
    'GIT',
    'AWS'
}

export const enum Level {
    'BASIC',
    'MEDIUM',
    'SENIOR',
    'MASTER_RACE'
}

export class SkillMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public technology?: Technology,
        public level?: Level,
        public developer?: BaseEntity,
    ) {
    }
}
