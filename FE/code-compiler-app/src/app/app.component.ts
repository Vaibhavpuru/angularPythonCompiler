import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <textarea [(ngModel)]="code" placeholder="Enter your code here"></textarea>
    <button (click)="compileCode()">Compile Code</button>
    <div *ngIf="result !== undefined">
      <h2>Result:</h2>
      <pre>{{ result }}</pre>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  code: string = '';
  result: string | undefined;

  constructor(private http: HttpClient) {}

  compileCode() {
    this.http.post<any>('http://127.0.0.1:5000/compile', { code: this.code }).subscribe(
      response => {
        this.result = response.result || response.error;
      },
      error => {
        console.error('Error compiling code:', error);
      }
    );
  }
}
