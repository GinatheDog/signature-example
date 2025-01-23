import { Component, ViewChild } from '@angular/core';
import { ModalController, Platform, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-signature-multi',
  templateUrl: './signature-multi.page.html',
  styleUrls: ['./signature-multi.page.scss'],
})
export class SignatureMultiPage {
  @ViewChild('imageCanvas', { static: false }) public canvas: any;
  canvasElement: any;
  platformAndroid: boolean;
  online: boolean;
  formID: any;
  sectionID: any;
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
    private navParams: NavParams,
    private modalController: ModalController, ) {
      this.showSigButton = false;
      setTimeout(() => {  this.setUpSig(); }, 250);
  }

  setUpSig() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.platform.width();
    if ( this.platformAndroid == true ) { this.canvasElement.height = 250; };
    if ( this.platformAndroid == false ) { this.canvasElement.height = 100; };
    let background = new Image();
    let ctx = this.canvasElement.getContext('2d');
    background.onload = () => { ctx.drawImage(background,0,0, this.canvasElement.width, this.canvasElement.height) };
  }

  startDrawing(ev: any) {
    this.showSigButton = true;
    this.drawing = true;
    let canvasPosition = this.canvasElement.getBoundingClientRect();
    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }

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

  endDrawing() { this.drawing = false }

  clearSig() { this.setUpSig(); this.showSigButton = false; }

  saveSig() {
    let signatureImg = this.canvasElement.toDataURL();
    let obj= { signatureImg: signatureImg }
    this.myDismiss(obj);
  }

  async myDismiss(obj:any) { await this.modalController.dismiss(obj); }
}