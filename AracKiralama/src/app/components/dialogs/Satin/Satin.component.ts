import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-Satin',
  templateUrl: './Satin.component.html',
  styleUrls: ['./Satin.component.css']
})
export class SatinComponent implements OnInit {
  toplamMiktar : number = 0;
  constructor(
    public dialogRef: MatDialogRef<SatinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.toplamMiktar = data;
  }

  ngOnInit() {
  }

}
