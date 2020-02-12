import {Component, Inject, OnInit} from '@angular/core';
import {BoardI} from '../../../interfaces/board';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-column',
  templateUrl: './modal-column.component.html',
  styleUrls: ['./modal-column.component.css']
})
export class ModalColumnComponent implements OnInit {


  public editionMode = false;
  public title = 'Ajout d\'une nouvelle colonne :';

  constructor(public dialogRef: MatDialogRef<ModalColumnComponent>, @Inject(MAT_DIALOG_DATA ) public data: BoardI) {
    if (this.data['id'] !== undefined && this.data['id'] != null) {
      this.editionMode = !this.editionMode;
      this.title = 'Edition de la colonne : ' + this.data.name;
    }
  }

  public save() {
    this.dialogRef.close(this.data);
  }
  ngOnInit() {
  }

}
