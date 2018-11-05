import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import { File } from '../file';
import {FileService} from "../file.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  selectedFile = null;
  fileExts;
  fileKeys = [];

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.fileService.uploadFile(this.selectedFile);
  }

  getAllFileExt() {
    this.fileService.getFileExts()
        .subscribe(exts => {
          this.fileExts = exts;
          this.fileKeys = Object.keys(exts);
        });
  }

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.getAllFileExt();
  }
}
