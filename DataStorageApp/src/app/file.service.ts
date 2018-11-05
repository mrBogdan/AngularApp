import { Injectable }              from '@angular/core';
import { Observable, of }          from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap }    from "rxjs/operators";

import { File } from './file';
import {tick} from "@angular/core/testing";

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

      return of(result as T);
    };

  };

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.filesUrl)
      .pipe(
        tap(files => console.log('fetched files')),
        catchError(this.handleError('getFiles', []))
      );
  }

  getFile(id): Observable<any> {
    return this.http.get<File>(`${this.filesUrl}${id}`)
      .pipe(
        tap(file => console.log('fetched file')),
        catchError(this.handleError('getFile', {}))
      );
  }

  updateFile(file: File): Observable<any> {
    return this.http.put(`${this.filesUrl}${file.id}`, file)
        .pipe(
          tap(() => console.log(`updated file id=${file.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
  }

  deleteFile(id): Observable<any> {
    return this.http.delete(`${this.filesUrl}${id}`)
        .pipe(
            catchError(this.handleError<any>('updateHero'))
        );
  }

  uploadFile(file): void {
    const fd = new FormData();
    
    fd.append("file", file);

    this.http.post(this.filesUrl, fd)
        .subscribe(res => {
          console.log(res);
        });
  }

  getFileExts() {
    return this.http.get(`${this.filesUrl}exts`)
        .pipe(
            catchError(this.handleError<any>('fileExts'))
        );

  }
}
