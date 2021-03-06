import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AddanswerComponent} from '../addanswer/addanswer.component';
import {HttpParams} from '@angular/common/http';
import {AnswersService} from '../../services/answers/answers.service';

@Component({
  selector: 'app-answeredit',
  templateUrl: './answeredit.component.html',
  styleUrls: ['./answeredit.component.scss']
})
export class AnswereditComponent implements OnInit {
  MouseIndex = -1;
  qwe: any;
  id: any;
  selected: any;
  displayedColumns: string[] = ['id', 'text', 'value', 'events'];

  constructor(public dialogRef: MatDialogRef<AnswereditComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, public dialog: MatDialog, private answerService: AnswersService) {
    this.qwe = data.answers;
    this.id = data.id;
  }

  ngOnInit() {
  }
onClick():
  void {
    const dialogRef = this.dialog.open(AddanswerComponent, {
        width: '700px',
        height: '700px',
        data: this.id,
      }
    );
    dialogRef.afterClosed();
}
  selectRow(row) {
    this.selected = row.id;
  }
  delete() {
    this.answerService.deleteAnswer(this.selected).subscribe();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteRow(event, answer) {
    event.stopPropagation();
    this.answerService.deleteAnswer(answer.id).subscribe();
  }
  onMouseOver(index) {
    this.MouseIndex = index;
  }
}
