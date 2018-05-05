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

export class DeveloperMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public philosophy?: string,
        public age?: number,
        public picture?: string,
        public speciality?: Technology,
        public skills?: BaseEntity[],
        public languages?: BaseEntity[],
    ) {
    }
}
