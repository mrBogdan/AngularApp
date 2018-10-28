import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FileUploader} from "ng2-file-upload";

import { FileService } from "../file.service";
import { File } from '../file';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent implements OnInit {

  file: File;

  constructor(
      private route: ActivatedRoute,
      private fileService: FileService,
      private location: Location
  ) { }

  ngOnInit() {
    this.getFile();
  }

  getFile(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fileService.getFile(id)
        .subscribe(file => this.file = file);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.fileService.updateFile(this.file)
        .subscribe(() => this.goBack());
  }

}
