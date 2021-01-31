import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from './api.service';


@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService) { }
  selectedMember = {id: 0, name: '', surname: '', phone: ''};
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
}
