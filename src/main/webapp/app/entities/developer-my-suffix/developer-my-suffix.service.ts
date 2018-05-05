import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DeveloperMySuffix } from './developer-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DeveloperMySuffix>;

@Injectable()
export class DeveloperMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/developers';

    constructor(private http: HttpClient) { }

    create(developer: DeveloperMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(developer);
        return this.http.post<DeveloperMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(developer: DeveloperMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(developer);
        return this.http.put<DeveloperMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DeveloperMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DeveloperMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DeveloperMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DeveloperMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DeveloperMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DeveloperMySuffix[]>): HttpResponse<DeveloperMySuffix[]> {
        const jsonResponse: DeveloperMySuffix[] = res.body;
        const body: DeveloperMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DeveloperMySuffix.
     */
    private convertItemFromServer(developer: DeveloperMySuffix): DeveloperMySuffix {
        const copy: DeveloperMySuffix = Object.assign({}, developer);
        return copy;
    }

    /**
     * Convert a DeveloperMySuffix to a JSON which can be sent to the server.
     */
    private convert(developer: DeveloperMySuffix): DeveloperMySuffix {
        const copy: DeveloperMySuffix = Object.assign({}, developer);
        return copy;
    }
}
