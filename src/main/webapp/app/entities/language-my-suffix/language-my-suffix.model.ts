import { BaseEntity } from './../../shared';

export const enum LanguageCode {
    'FRENCH',
    'ENGLISH',
    'SPANISH',
    'DUTCH'
}

export const enum Level {
    'BASIC',
    'MEDIUM',
    'SENIOR',
    'MASTER_RACE'
}

export class LanguageMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public code?: LanguageCode,
        public comment?: string,
        public level?: Level,
        public developers?: BaseEntity[],
    ) {
    }
}
