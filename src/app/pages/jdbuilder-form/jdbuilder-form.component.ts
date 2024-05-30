import { Component, OnInit} from '@angular/core';
import { ApiService } from "../../api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
// Sweet Alert
import Swal from 'sweetalert2';

// Ck Editer
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-jdbuilder-form',
  templateUrl: './jdbuilder-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,AngularEditorModule],
  styleUrl: './jdbuilder-form.component.scss'
})
export class JDBuilderFormComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  // public Editor = ClassicEditor;
  successMessage: string = "";
  public totalCountDesc : any = 0; 
  public totalCountReq : any = 0;
  public totalCountBenefit : any = 0;

  closeResult: string = '';
  wordsDesc: any;
  wordsReq: any;
  wordsBenefit: any;

  submitForm = new FormGroup({
    job_title: new FormControl(''),
    hire_num: new FormControl(''),
    job_code: new FormControl(''),
    workplace: new FormControl(''),
    // job_location: new FormControl(''),
    job_country: new FormControl(''),
    job_region: new FormControl(''),
    job_state: new FormControl(''),
    job_zip_code: new FormControl(''),
    // emp_location: new FormControl(''),
    emp_country: new FormControl(''),
    emp_region: new FormControl(''),
    emp_state: new FormControl(''),
    emp_zip_code: new FormControl(''),
    job_desc: new FormControl(''),
    job_req: new FormControl(''),
    job_benefit: new FormControl(''),
    job_skills: new FormControl(''),
    industry: new FormControl(''),
    function: new FormControl(''),
    empl_type: new FormControl(''),
    exp_level: new FormControl(''),
    education: new FormControl(''),
    exp_year: new FormControl(''),
    salary_from: new FormControl(''),
    salary_to: new FormControl(''),
    salary_currency: new FormControl('')
  });

  jobEditorConfig: AngularEditorConfig = {
    editable: true,
    height: 'auto',
    minHeight: '250px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    placeholder: 'Enter job description, include key areas of responsibility and typical day at work',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
};

reqEditorConfig: AngularEditorConfig = {
  editable: true,
  height: 'auto',
  minHeight: '250px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  enableToolbar: true,
  placeholder: 'Enter job requirements here, specific qualificatons needed to the soft skill requirements',
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'undo',
      'redo',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
      'heading',
      'fontName'
    ],
    [
      'fontSize',
      'textColor',
      'backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode'
    ]
  ]
};

benefitEditorConfig: AngularEditorConfig = {
  editable: true,
  height: 'auto',
  minHeight: '250px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  enableToolbar: true,
  placeholder: 'Enter benefits here, include salary details, benefits and perks',
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'undo',
      'redo',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
      'heading',
      'fontName'
    ],
    [
      'fontSize',
      'textColor',
      'backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode'
    ]
  ]
};

/**
   * Success sweet alert
   * @param successmsg modal content
   */
successmsg() {
  Swal.fire({
    title: 'Success!',
    text: 'Your JD has been created',
    icon: 'success',
    // showCancelButton: true,
    confirmButtonColor: 'rgb(3, 142, 220)',
    cancelButtonColor: 'rgb(243, 78, 78)',
    confirmButtonText: 'OK'
  }).then(result => {
    if (result.value) {
      this.router.navigateByUrl('/projects/list');
    }
  });;
}

/**
   * Confirm sweet alert
   * @param confirm modal content
   */
modelTitle() {
  Swal.fire({
    title: 'Oops...',
    text: 'Something went wrong!',
    icon: 'warning',
    // showCancelButton: true,
    confirmButtonColor: 'rgb(3, 142, 220)',
    cancelButtonColor: 'rgb(243, 78, 78)',
    confirmButtonText: 'OK'
  });
}


  constructor(private apiService: ApiService, private http: HttpClient,private modalService: NgbModal,private router: Router) { 

  }

  open(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Basic Elementss', active: true }
    ];
  }

  onSubmit(): void {
    // Process submit data here
    console.warn('Your order has been submitted', this.submitForm.value);
    const formData = new FormData();
    for (const [key, value] of Object.entries(this.submitForm.value)) {
      if (typeof value != "object") {
          formData.append(key, String(value))
      }
  }

    this.apiService.sendFormData(formData).subscribe(
      (response: any) => {
        // Handle the success response here
        // alert(JSON.stringify(response));
        this.successMessage = response.result;
        if(this.successMessage == "1"){
          this.successmsg();
        }
        else{
          this.modelTitle();
        }
        // alert(this.successMessage);
        //this.submitForm.value = {}; // Clear the form
      },
      (error: any) => {
        // Handle the error response here
        console.error(error);
      }
    );
    // this.submitForm.reset();
  }

  onkeyupDesc(){
    // this.submitForm.value.job_desc?.length;
    // this.totalCountDesc = String(this.submitForm.value.job_desc?.length);

    this.wordsDesc = this.submitForm.value.job_desc ? this.submitForm.value.job_desc?.split(/\s+/) : 0;
    this.totalCountDesc = this.wordsDesc ? this.wordsDesc.length : 0;
    }

  onkeyupReq(){
      // this.submitForm.value.job_req?.length;
      // this.totalCountReq = String(this.submitForm.value.job_req?.length);

    this.wordsReq = this.submitForm.value.job_req ? this.submitForm.value.job_req?.split(/\s+/) : 0;
    this.totalCountReq = this.wordsReq ? this.wordsReq.length : 0;
    }
  
  onkeyupBenefit(){
      // this.submitForm.value.job_benefit?.length;
      // this.totalCountBenefit = String(this.submitForm.value.job_benefit?.length);

    this.wordsBenefit = this.submitForm.value.job_benefit ? this.submitForm.value.job_benefit?.split(/\s+/) : 0;
    this.totalCountBenefit = this.wordsBenefit ? this.wordsBenefit.length : 0;
    }

}
