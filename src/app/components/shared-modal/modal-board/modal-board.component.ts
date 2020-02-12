import {Component, Inject, OnInit} from '@angular/core';
import {BoardI} from '../../../interfaces/board';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-board',
  templateUrl: './modal-board.component.html',
  styleUrls: ['./modal-board.component.css']
})
export class ModalBoardComponent implements OnInit {

  public editionMode = false;
  public title = 'Ajout d\'un nouveau board';

  public nameCtrl: FormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<ModalBoardComponent>, @Inject(MAT_DIALOG_DATA) public data: BoardI) {
    const {id, name} = this.data;
    if (id && name) {
      this.editionMode = true;
      this.title = `Edition du board ${name}`;
    }

    this.nameCtrl.patchValue(name);
  }

  public save() {
    let {id} = this.data;
    if (!id && !+id) {
      id = null;
    }
    const name = this.nameCtrl.value;
    const board = {name, id};
    this.dialogRef.close(board);

  }

  ngOnInit() {
  }

}
