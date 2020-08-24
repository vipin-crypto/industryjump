import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Resp } from 'src/app/models/Resp';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  formc : FormGroup
  faqList: any
  bankList:any
  selectquestion: any
  selectanswer: any;
  private formSubmitAttempt: boolean;
  id: any;
  indexValue: any;
  docindexValue:any
  bankindexValue:any
  question: any;
  answer: any;
  add: boolean = true
  addBank :boolean =true
  addDoc : boolean = true
  bankname: any;
  selectBank: any;
  documentList:any
  selectdocname: any;
  docname: any;
  constructor(private fb: FormBuilder, private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.api.getStaticPages().subscribe(
      (data: any) => {
        if (data.success) {
          this.id = data.data._id
          this.form = this.fb.group({
            TNC: data.data.TNC,
          });
          this.form1 = this.fb.group({
            privacyPolicy: data.data.privacyPolicy
          });
          this.form2 = this.fb.group({
            aboutUs: data.data.aboutUs,
          });
          // this.formc = this.fb.group({
          //   commission : data.data.commission,
          //   commissionType : data.data.commissionType
          // });
          this.faqList = data.data.FAQ
          this.bankList =data.data.banks
          this.documentList =data.data.documents
        }

      })

    this.form = this.fb.group({
      TNC: ['', Validators.required]
    });
    this.form1 = this.fb.group({
      privacyPolicy: ['', Validators.required]
    });
    this.form2 = this.fb.group({
      aboutUs: ['', Validators.required]
    });
    // this.formc= this.fb.group({
    //   commission : [0, Validators.required],
    //   commissionType: ['', Validators.required],
    // });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  editFaq(data, i) {
    this.indexValue = i
    this.question = data.question
    this.answer = data.answer
    console.log(data)
    this.add = false
    this.selectquestion = data.question
    this.selectanswer = data.answer
  }
  editdoument(data, i) {
    this.docindexValue = i
    this.docname = data.name
    console.log(data)
    this.addDoc = false
    this.selectdocname = data.name
  }
  
  editBank(data, i) {
    console.log(data,"bankdata")
    this.bankindexValue = i
    this.bankname = data.name
    this.addBank = false
    this.selectBank = data.name
  }
  updateFaq() {
    if (this.question.trim() == '' || this.answer.trim() == '')
      return this.common.errorToast('Enter your Question and Answer')
    if (this.selectanswer || this.selectquestion) {
      console.log("ataaffff")
      const index = this.faqList.indexOf(this.answer, this.question);
      console.log(this.faqList, "data")
      this.faqList[this.indexValue].question = this.question;
      this.faqList[this.indexValue].answer = this.answer;
      // }
    }
    else {
      if (this.faqList.indexOf(this.question) == -1 && this.faqList.indexOf(this.answer == -1)) {
        let data = {
          question: this.question,
          answer: this.answer
        }
        this.faqList.push(data)
        // this.faqList.push(this.answer)
      }
    }

    let form = {
      id: this.id,
      FAQ: this.faqList
    }
    this.api.saveStaticPages(form).subscribe((response: any) => {
      if (response.success)
        this.faqList = response.data.FAQ;
      this.common.successToast('Updated Successfully!');
      this.add = true;
      this.question = '';
      this.answer = '';

    });
  }
  addData(data) {
    console.log("data", data)
    let data1 = {
      question: data.form.value.question,
      answer: data.form.value.answer
    }
    this.faqList.push(data1)
    let FaqData = {
      id: this.id,
      FAQ: this.faqList
    }
    console.log(FaqData)
    this.api.saveStaticPages(FaqData).subscribe((response: any) => {
      if (response.success)
        this.faqList = response.data.FAQ;
      this.common.successToast('Added Successfully!');
      this.add = true;
      this.question = '';
      this.answer = '';

    })
  }

  deleteFaq(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Question and Answer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        let index = this.faqList.indexOf(data);
        this.faqList.splice(index, 1)
        //  this.faqList.id = this.id
        // if (this.form1.valid) {
        let form = {
          id: this.id,
          FAQ: this.faqList
        }
        this.api.saveStaticPages(form).subscribe((response: any) => {
          if (!response.success) return;
          // this.common.successToast('Updated successfully!');
          this.ngOnInit();
          this.question = '';
          this.answer = ''
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Has been deleted Successfully!',
            icon: 'success'
          })
        })
      }
    })
  }
  onSubmit() {
    if (this.form.valid) {
      let form = {
        id: this.id,
        TNC: this.form.value.TNC
      }
      this.api.saveStaticPages(form).subscribe(
        (response: Resp) => {
          if (!response.success) return
          this.common.successToast('Updated successfully!');
          this.ngOnInit();
        })
    }
    this.formSubmitAttempt = true;
  }

  
  onSubmit1() {
    if (this.form1.valid) {
      let form = {
        id: this.id,
        privacyPolicy: this.form1.value.privacyPolicy
      }
      this.api.saveStaticPages(form).subscribe(
        (response: Resp) => {
          if (!response.success) return
          this.common.successToast('Updated successfully!');
          this.ngOnInit();
        })
    }
    this.formSubmitAttempt = true;
  }
  onSubmit2() {
    if (this.form2.valid) {
      let form = {
        id: this.id,
        aboutUs: this.form2.value.aboutUs
      }
      this.api.saveStaticPages(form).subscribe(
        (response: Resp) => {
          if (!response.success) return
          this.common.successToast('Updated successfully!');
          this.ngOnInit();
        })
    }
    this.formSubmitAttempt = true;
  }
  updateBank() {
    if (this.bankname.trim() == '')
      return this.common.errorToast('Enter your Bank Name')
    if (this.selectBank) {
      console.log("ataaffff")
      const index = this.bankList.indexOf(this.bankname);
      console.log(this.bankList, "data")
      this.bankList[this.bankindexValue].name = this.bankname;
    }
    else {
      if (this.bankList.indexOf(this.bankname) == -1) {
        let data = {
          name: this.bankname,
        }
        this.bankList.push(data)
        // this.faqList.push(this.answer)
      }
    }

    let form = {
      id: this.id,
      banks: this.bankList
    }
    this.api.saveStaticPages(form).subscribe((response: any) => {
      if (response.success)
        this.bankList = response.data.banks;
      this.common.successToast('Updated Successfully!');
      this.addBank = true;
      this.bankname = '';

    });
  }
  addBankData(data) {
    console.log("data", data)
    let data1 = {
      name: data.form.value.bankname,
    }
    console.log(data1)
    this.bankList.push(data1)
    let form = {
       id: this.id,
      banks: this.bankList
    }
    console.log(form)
    this.api.saveStaticPages(form).subscribe((response: any) => {
      if (response.success)
        this.bankList = response.data.banks;
      this.common.successToast('Added Successfully!');
      this.addBank = true;
      this.bankname = '';

    })
  }

  deleteBank(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Bank!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        let index = this.bankList.indexOf(data);
        this.bankList.splice(index, 1)
        //  this.faqList.id = this.id
        // if (this.form1.valid) {
        let form = {
          banks: this.bankList,
          id: this.id
        }
        this.api.saveStaticPages(form).subscribe((response: any) => {
          if (!response.success) return;
          // this.common.successToast('Updated successfully!');
          this.ngOnInit();
          this.bankname = '';
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Has been deleted Successfully!',
            icon: 'success'
          })
        })
      }
    })
  }
  updatedoc() {
    if (this.docname.trim() == '')
      return this.common.errorToast('Enter your Document Name')
    if (this.selectdocname) {
      console.log("ataaffff")
      const index = this.documentList.indexOf(this.docname);
      console.log(this.documentList, "data")
      this.documentList[this.docindexValue].name = this.docname;
    }
    else {
      if (this.documentList.indexOf(this.docname) == -1) {
        let data = {
          name: this.docname,
        }
        this.documentList.push(data)
        // this.faqList.push(this.answer)
      }
    }

    let form = {
      id: this.id,
      documents: this.documentList
    }
    this.api.saveStaticPages(form).subscribe((response: any) => {
      if (response.success)
        this.documentList = response.data.documents;
      this.common.successToast('Updated Successfully!');
      this.addDoc = true;
      this.docname = '';

    });
  }
  addDocData(data) {
    //  if (data.form.value.question.trim()=='' || data.form.value.answer.trim()=='')
    //   return this.common.errorToast('Enter your Question and Answer')
    console.log("data", data)
    let data1 = {
      name: data.form.value.docname,
    }
    console.log(data1)
    this.documentList.push(data1)
    let form = {
      id: this.id,
      documents: this.documentList
    }
    console.log(form)
    this.api.saveStaticPages(form).subscribe((response: any) => {
      if (response.success)
        this.documentList = response.data.documents;
      this.common.successToast('Added Successfully!');
      this.addDoc = true;
      this.docname = '';

    })
  }

  deleteDoc(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Document Name !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        let index = this.documentList.indexOf(data);
        this.documentList.splice(index, 1)
        //  this.faqList.id = this.id
        // if (this.form1.valid) {
        let form = {
          id : this.id,
          documents: this.documentList
        }
        this.api.saveStaticPages(form).subscribe((response: any) => {
          if (!response.success) return;
          // this.common.successToast('Updated successfully!');
          this.ngOnInit();
          this.docname = '';
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Has been deleted Successfully!',
            icon: 'success'
          })
        })
      }
    })
  }
}

