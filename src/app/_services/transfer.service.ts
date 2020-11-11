import { transferedData } from './../_models/transferdData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}

  createTransfer(from: Number, to: Number, balance: Number) {
    const transferProcess: transferedData = {
      from: from,
      to: to,
      balance: balance,
    };
    return this.http.post(
      'http://localhost:8080/api/transfer',
      transferProcess
    );
  }
}
