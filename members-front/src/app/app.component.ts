import { Component } from '@angular/core';
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

  constructor(private api: ApiService) {
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
    this.api.getMember(member.id).subscribe(
      data => {
        console.log(data);
        this.selectedMember = data;
      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    );
  }

}
