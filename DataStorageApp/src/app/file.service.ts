import { Injectable }              from '@angular/core';
import { Observable, of }          from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap }    from "rxjs/operators";

import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private urlApi:string = 'http://localhost:8000/api/v1';

  private filesUrl:string = this.urlApi + '/files/';
  private logError:string = this.urlApi + '/log';

  constructor(
      private http: HttpClient
  ) { }

  private handleError <T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };

  };

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.filesUrl)
      .pipe(
        tap(files => this.log('fetched files')),
        catchError(this.handleError('getFiles', []))
      );
  }

    /**
     * get file
     * @param id
     */
  getFile(id): Observable<any> {
    return this.http.get<File>(`${this.filesUrl}${id}`)
      .pipe(
        tap(file => this.log('fetched file')),
        catchError(this.handleError('getFile', {}))
      );
  }

    /**
     * @param file: File
     * update file
     */
  updateFile(file: File): Observable<any> {
    return this.http.put(`${this.filesUrl}${file.id}`, file)
        .pipe(
          tap(_ => this.log(`updated file id=${file.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
  }

    /**
     *
     * @param file
     */
  deleteFile(file: File | number): Observable<any> {
    return
  }



  log(msg: string) {
      this.http.post(this.logError, msg);
  }
}
