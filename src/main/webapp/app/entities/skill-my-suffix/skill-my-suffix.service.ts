import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SkillMySuffix } from './skill-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SkillMySuffix>;

@Injectable()
export class SkillMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/skills';

    constructor(private http: HttpClient) { }

    create(skill: SkillMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(skill);
        return this.http.post<SkillMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(skill: SkillMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(skill);
        return this.http.put<SkillMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SkillMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SkillMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SkillMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SkillMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SkillMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SkillMySuffix[]>): HttpResponse<SkillMySuffix[]> {
        const jsonResponse: SkillMySuffix[] = res.body;
        const body: SkillMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SkillMySuffix.
     */
    private convertItemFromServer(skill: SkillMySuffix): SkillMySuffix {
        const copy: SkillMySuffix = Object.assign({}, skill);
        return copy;
    }

    /**
     * Convert a SkillMySuffix to a JSON which can be sent to the server.
     */
    private convert(skill: SkillMySuffix): SkillMySuffix {
        const copy: SkillMySuffix = Object.assign({}, skill);
        return copy;
    }
}
