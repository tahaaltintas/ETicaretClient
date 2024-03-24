import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, input, output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "assets/delete.png");
    img.setAttribute("style", "cursor:pointer");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @Input() controller: string

  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.Timer);
        const td: HTMLTableCellElement = this.element.nativeElement;
        // await this.productService.delete(this.id);
        await this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          this.callBack.emit();
          this.alertify.message("Ürün Başarıyla Silindi", {
            messageType: MessageType.Success,
            position: Position.TopRight,
            dismissOthers: true
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.alertify.message("Ürün Beklenemeyen Bir Nedenle Silinemedi", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          })
        });
      }
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes)
        afterClosed();
    });
  }

}
