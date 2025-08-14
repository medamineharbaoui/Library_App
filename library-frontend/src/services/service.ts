import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Book, BookCreateUpdateDTO } from '../models/book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  list(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.base}/books`);

  }
  create(dto: BookCreateUpdateDTO): Observable<Book> {
    return this.http.post<Book>(`${this.base}/books`, dto);
  }
  update(id: number, dto: BookCreateUpdateDTO): Observable<Book> {
    return this.http.put<Book>(`${this.base}/books/${id}`, dto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/books/${id}`);
  }
}
