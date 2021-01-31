import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'members-front';
  selectedMember = {id: 0, name: '', surname: ''};

  members = [
    {name: 'Member 01', id: 1, surname: 'Ciclano', photo: 'http://www.minhapp.com/foto1'},
    {name: 'Member 02', id: 2, surname: 'Fulano', photo: 'http://www.minhapp.com/foto2'},
    {name: 'Member 03', id: 3, surname: 'Beltrano', photo: 'http://www.minhapp.com/foto3'},
  ];

  constructor(private api: ApiService, private router: Router) {
    this.getMembers();
  }

  getMembers = () => {
    this.api.getAllMembers().subscribe(
      data => {
        this.members = data;
      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    );
  };
  
  memberClicked = (member) => {
    this.router.navigate(['member-detail', member.id])
  }

}
