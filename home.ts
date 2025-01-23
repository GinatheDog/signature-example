import { Component, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-signature-multi',
  templateUrl: './signature-multi.page.html',
  styleUrls: ['./signature-multi.page.scss'],
})
export class SignatureMultiPage {
  @ViewChild('imageCanvas', { static: false }) public canvas: any;
  canvasElement: any;
  drawing = false;
  saveX: number;
  saveY: number;
  selectedColor = '#4250ad';
  lineWidth = 5;
  index: any;
  sigArrayIndex: any;
  showSigButton: boolean;

  constructor(
    private platform: Platform,
    private modalController: ModalController, ) {
      this.showSigButton = false;
      setTimeout(() => {  this.setUpSig(); }, 250);
  }

  // setup canvas
  setUpSig() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.platform.width();
    this.canvasElement.height = 100;
    let background = new Image();
    let ctx = this.canvasElement.getContext('2d');
    background.onload = () => { ctx.drawImage(background,0,0, this.canvasElement.width, this.canvasElement.height) };
  }

  // // listen for mouse starting drawing
  startDrawing(ev: any) {
    this.showSigButton = true;
    this.drawing = true;
    let canvasPosition = this.canvasElement.getBoundingClientRect();
    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }
  // listen for mouse movement
  moved(ev: any) {
    if (!this.drawing) return;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.stroke();
    this.saveX = currentX;
    this.saveY = currentY;
  }
   // stop drawing
  endDrawing() { this.drawing = false }

  // setup canvas
  clearSig() { this.setUpSig()  }

  // save signature
  saveSig() {
    let signatureImg = this.canvasElement.toDataURL();
    let obj= { signatureImg: signatureImg }
    this.myDismiss(obj);
  }
  // mobile close window
  async myDismiss(obj:any) { await this.modalController.dismiss(obj); }
}