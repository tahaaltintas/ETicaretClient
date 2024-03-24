import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrPosition, ToastrType } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(
    private htttpClientService: HttpClientService,
    private alertify: AlertifyService,
    private toastr: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      })
    }

    this.dialogService.openDialog({
      componentType: FileUploadComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.htttpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {

          const message: string = "Dosyalar Başarılı Bir Şekilde Eklenmiştir.";

          if (this.options.isAdminPage) {
            this.alertify.message(message, {
              position: Position.TopRight,
              messageType: MessageType.Success,
              dismissOthers: true
            });
          } else {
            this.toastr.message(message, "Başarılı", {
              messageType: ToastrType.Success,
              position: ToastrPosition.TopRight
            })
          }

        }, (errorResponse: HttpErrorResponse) => {

          const message: string = "Dosya Beklenmeyen Bir Hata Nedeniyle Eklenenemedi.";

          if (this.options.isAdminPage) {
            this.alertify.message(message, {
              position: Position.TopRight,
              messageType: MessageType.Error,
              dismissOthers: true
            });
          } else {
            this.toastr.message(message, "Hata", {
              messageType: ToastrType.Error,
              position: ToastrPosition.TopRight
            })
          }

        });
      }
    })
  }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}