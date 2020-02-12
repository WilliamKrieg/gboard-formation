import {Component, Inject, OnInit} from '@angular/core';
import {ModalBoardComponent} from '../modal-board/modal-board.component';
import {BoardI} from '../../../interfaces/board';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  public message = 'Voulez vous vraiment supprimer cette élément ?';

  constructor(public dialogRef: MatDialogRef<ModalConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: BoardI) {
    if (this.data['message'] !== undefined && this.data['message'] != null && this.data['message'] !== '') {
      this.message = this.data['message'];
    }
  }

  public confirm() {
    this.dialogRef.close(this.data);
  }
  ngOnInit() {
  }

}
