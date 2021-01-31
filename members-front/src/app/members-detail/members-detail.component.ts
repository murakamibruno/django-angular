import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ApiService } from './api.service';


@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private api: ApiService,
    private router: Router,
    private appComponent: AppComponent
    ) { }
    
  selectedMember = {id: 0, name: '', surname: '', phone: '', photo:''};
  selectedId;

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id'));
      this.selectedId = id;
      this.loadMember(id);
    });
  }

  loadMember(id) {
    this.api.getMember(id).subscribe(
      data => {
        this.selectedMember = data;
      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    );
  }

  update() {
    this.api.updateMember(this.selectedMember).subscribe(
      data => {
        this.selectedMember = data;
      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    );
  }

  newMember() {
    this.router.navigate(['new-member'])
  }

  delete() {
    this.api.deleteMember(this.selectedId).subscribe(
      data => {
        this.appComponent.members.forEach((elem,index) => {
          if (elem.id == this.selectedId) {
            this.appComponent.members.splice(index,1);
          }
        });

      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    );
  }
}
