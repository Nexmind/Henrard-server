import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LanguageMySuffix } from './language-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LanguageMySuffix>;

@Injectable()
export class LanguageMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/languages';

    constructor(private http: HttpClient) { }

    create(language: LanguageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(language);
        return this.http.post<LanguageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(language: LanguageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(language);
        return this.http.put<LanguageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LanguageMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LanguageMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<LanguageMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LanguageMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LanguageMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LanguageMySuffix[]>): HttpResponse<LanguageMySuffix[]> {
        const jsonResponse: LanguageMySuffix[] = res.body;
        const body: LanguageMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LanguageMySuffix.
     */
    private convertItemFromServer(language: LanguageMySuffix): LanguageMySuffix {
        const copy: LanguageMySuffix = Object.assign({}, language);
        return copy;
    }

    /**
     * Convert a LanguageMySuffix to a JSON which can be sent to the server.
     */
    private convert(language: LanguageMySuffix): LanguageMySuffix {
        const copy: LanguageMySuffix = Object.assign({}, language);
        return copy;
    }
}
