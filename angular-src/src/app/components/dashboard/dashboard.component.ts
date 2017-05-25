import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { Popup } from 'ng2-opd-popup';
import { UserPOJO } from '../../dto/user';
import { QualPOJO } from '../../dto/qualification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  qualification: Object[];
  qualificationName: String;
  year: String;
  college: String;
  university: String;
  user: UserPOJO.UserDTO;
  _id: String;
  selQualificationName: String;
  selYear: String;
  selCollege: String;
  selUniversity: String;

  @ViewChild('popupAdd') popupAdd: Popup;
  @ViewChild('popupEdit') popupEdit: Popup;
  @ViewChild('popupDel') popupDel: Popup;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  loadData() {
    this.authService.getQual().subscribe(data => {
      this.qualification = data.qualification;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    const userObject = {
      username: this.user.username
    }
    this.loadData();
  }

  clearData() {
    this.qualificationName = null;
    this.year = null;
    this.college = null;
    this.university = null;
  }

  onCreateQual() {
    this.user = JSON.parse(localStorage.getItem("user"));
    const qualification = {
      qualificationName: this.qualificationName,
      year: this.year,
      college: this.college,
      university: this.university,
      user: this.user.username
    }

    this.authService.createQual(qualification).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Qualification created successfully', { cssClass: 'alert-success', timeout: 3000 });
        this.popupAdd.hide();
        this.loadData();
        this.clearData();
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  openCreateDialog() {
    this.popupAdd.options = {
      header: "Create",
      color: "#5cb85c", // red, blue.... 
      widthProsentage: 30, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Save", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popupAdd.show(this.popupAdd.options);
  }

  setQualData(qualificationObj) {
    this._id = qualificationObj._id;
    this.selQualificationName = qualificationObj.qualificationName;
    this.selYear = qualificationObj.year;
    this.selCollege = qualificationObj.college;
    this.selUniversity = qualificationObj.university;
  }

  onEditQual() {
    this.user = JSON.parse(localStorage.getItem("user"));
    const selQualification = {
      _id: this._id,
      qualificationName: this.selQualificationName,
      year: this.selYear,
      college: this.selCollege,
      university: this.selUniversity,
      user: this.user.username
    }
    this.authService.updateQual(selQualification).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Qualification updated successfully', { cssClass: 'alert-success', timeout: 3000 });
        this.popupEdit.hide();
        this.loadData();
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }


  onDelQual() {
    this.authService.delQual(this._id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Qualification deleted successfully', { cssClass: 'alert-success', timeout: 3000 });
        this.popupDel.hide();
        this.loadData();
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  public isCollapsedContent:boolean = false;
   @ViewChild('qualPanelBody') el:ElementRef;

   collapseQualPanel(){
    this.isCollapsedContent = !this.isCollapsedContent;
    if(this.isCollapsedContent)
      this.el.nativeElement.className = 'glyphicon glyphicon-collapse-up pull-right';
    else
      this.el.nativeElement.className = 'glyphicon glyphicon-collapse-down pull-right';
   }
}
