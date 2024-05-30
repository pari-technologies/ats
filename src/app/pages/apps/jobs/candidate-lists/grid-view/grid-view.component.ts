import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { candidatelist } from 'src/app/core/data';
import { ApiService } from "../../../../../api.service";
import { HttpEventType, HttpResponse,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  gridview: any;
  allgridList: any;
  searchResults: any;
  searchTerm: any;

  candidates:any;

  constructor(public service: PaginationService,private apiService: ApiService, private http: HttpClient) {
    this.service.pageSize = 20
  }

  ngOnInit(): void {
    /**
* BreadCrumb
*/
    this.breadCrumbItems = [
      { label: 'Candidate Lists' },
      { label: 'Grid View', active: true }
    ];
    // Fetch Data
    // setTimeout(() => {
      this.apiService.getCandidates().subscribe(
        (data: candidatelist[]) => {
          this.candidates = data;
          // this.success = 'successful retrieval of the list';
          this.gridview = this.service.changePage(this.candidates);
          this.allgridList = this.candidates;
          
        },
        (err) => {
          console.log(err);
          // this.error = err;
        }
      );
      document.getElementById('elmLoader')?.classList.add('d-none')
      // this.candidates = this.apiService.getCandidates();
      
    // }, 1200)

  }

  ngOnDestroy() {
    this.service.pageSize = 8
  }

  // Pagination
  changePage() {
    this.gridview = this.service.changePage(this.allgridList)
  }


  // Search Data
  performSearch(): void {
    this.searchResults = this.allgridList.filter((item: any) => {
      return (
        item.om_cand_first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.om_cand_last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.rating.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ratingCount.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.gridview = this.service.changePage(this.searchResults)
  }


}
