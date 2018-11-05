import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { FileService} from "../file.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  files: File[] = [];

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles()
        .subscribe((files) => {
            let self = this;

            files.forEach(function (item) {
                self.files.push(
                    <File>{
                      id: item.id,
                      name: item.name,
                      size: item.size,
                      upload: new Date(item.upload).toLocaleTimeString()
                    }
                );
            });
        });
  }

}
