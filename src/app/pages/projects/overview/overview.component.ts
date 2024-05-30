import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { projectDocument, ProjectTeam } from 'src/app/core/data';

import { Router, ActivatedRoute } from '@angular/router';
import { candidatelist } from 'src/app/core/data';
import { ApiService } from "../../../api.service";

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

/**
 * Overview Component
 */
export class OverviewComponent {

  projectListWidgets!: any;
  teamOverviewList: any;
  userData :any;
  submitted = false;

  id :any;

  constructor(private router: Router,
    public route: ActivatedRoute,private apiService: ApiService,private modalService: NgbModal,public domSanitizer: DomSanitizer) {
    this.id = this.route.snapshot.queryParamMap.get("id"); 
  }


  ngOnInit(): void {
    /**
      * Fetches the data
      */
    this.apiService.getJobsById(this.id).subscribe(
      (data: candidatelist[]) => {
        this.userData = data[0];
        
      },
      (err) => {
        console.log(err);
        // this.error = err;
      }
    );
    this.projectListWidgets = projectDocument;
    this.teamOverviewList = ProjectTeam;
  }



  /**
 * Open modal
 * @param content modal content
 */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
  * Active Toggle navbar
  */
  activeMenu(id: any) {
    document.querySelector('.star_' + id)?.classList.toggle('active');
  }


}
