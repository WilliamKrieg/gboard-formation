import {Component, HostListener, OnInit} from '@angular/core';
import {BoardsService} from '../../services/boards.service';
import {BoardI} from '../../interfaces/board';
import {ModalBoardComponent} from '../shared-modal/modal-board/modal-board.component';
import {ModalConfirmationComponent} from '../shared-modal/modal-confirmation/modal-confirmation.component';
import {LoaderService} from '../../services/tools/loader.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public boards: any[] = [];


  public rowHeight = '4:2';
  public columns = 3;


  constructor(private boardsService: BoardsService, private dialog: MatDialog, private loaderService: LoaderService) {
  }

  edit(board: BoardI) {

    const dialog = this.dialog.open(ModalBoardComponent, {data: {...board}});
    dialog.afterClosed().subscribe((editedItem: { id, name }) => {
      if (editedItem) {
        const {name, id} = editedItem;
        this.loaderService.addLoader();
        this.boardsService.patch({...board, id, name}).subscribe((updatedItem: BoardI) => {
          this.boards = this.boards.map(item => {
            if (item.id === updatedItem.id) {
              item = updatedItem;
            }
            return item;
          });
          console.log(this.boards);
        });
      }
      this.loaderService.removeLoader();
    });
  }


  add() {
    const board: BoardI = {id: null, name: '', columns: []};
    // Rappel la modal ne sert qu'a modifiter / créer le nom
    const dialog = this.dialog.open(ModalBoardComponent, {width: '500px', data: board});
    dialog.afterClosed().subscribe((editedItem: BoardI) => {
      if (editedItem) {
        board.name = editedItem.name; // On séléctionne ce que on souhaite pour éviter les sources d'erreurs.
        this.boardsService.add(board).subscribe((createdItem) => {
          this.boards.push(createdItem);
        });
      }
    });
  }

  delete(board: BoardI, index: number) {
    const dialog = this.dialog.open(ModalConfirmationComponent, {
      width: '500px', data: {
        message: `'Supprimer le board : ${board.name} ?`
      }
    });
    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.boardsService.delete(board.id).subscribe(() => {
          // Exemple pour filtrer un tableaud dans le cas ou on aurait pas l'index mais l'ID
          this.boards = this.boards.filter((item: BoardI) => item.id !== board.id);
          // La ligne ci dessu est identise à :
          this.boards = this.boards.filter((item: BoardI) => {
            return item.id !== board.id; // Le return est implécite dans la ligne prècédente.
          });
          // this.boards.splice(index, 1);
          // Ou encore
          // delete this.boards[index] = écrase par undefined
        });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    if (width <= 700) {
      this.columns = 1;
    } else if (width > 700 && width < 1100) {
      this.columns = 2;
    } else {
      this.columns = 3;
    }
  }


  ngOnInit() {
    this.boardsService.getLists().subscribe((res: any) => {
      this.boards = res;
    });
  }

}
