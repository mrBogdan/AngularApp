import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import { File } from '../file';
import { FileService } from "../file.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  files: File[];

  getFiles(): void {
    this.fileService.getFiles()
        .subscribe(files => this.files = files);
  }

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.getFiles();
  }
}
