import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashmessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
  },
  err =>{
    console.log(err);
    return false;
  });

}

public isCollapsedContent:boolean = false;
   @ViewChild('qualPanelBody') el:ElementRef;

   collapseProfPanel(){
    this.isCollapsedContent = !this.isCollapsedContent;
    if(this.isCollapsedContent)
      this.el.nativeElement.className = 'glyphicon glyphicon-collapse-up pull-right';
    else
      this.el.nativeElement.className = 'glyphicon glyphicon-collapse-down pull-right';
   }

   downloadFile(){
      const data = [
  {
    name: "Test 1",
    age: 13,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 2',
    age: 11,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 4',
    age: 10,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
];
 
var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true 
  };

new Angular2Csv(data, 'My Report', options);
   }
   
}
