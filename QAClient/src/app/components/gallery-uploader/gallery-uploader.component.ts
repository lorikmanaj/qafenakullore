import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery-uploader',
  templateUrl: './gallery-uploader.component.html',
  styleUrls: ['./gallery-uploader.component.css']
})
export class GalleryUploaderComponent {
  selectedFiles: File[] = [];
  selectedFileUrls: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      // Convert the selected file to a data URL to display as an image thumbnail
      this.convertToDataUrl(file);
    }
  }

  private convertToDataUrl(file: File) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.selectedFileUrls.push(event.target.result);
    };

    reader.readAsDataURL(file);
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.selectedFileUrls.splice(index, 1);
    // Clear the file input to allow reselection of the same file
    this.fileInput.nativeElement.value = '';
  }
}
