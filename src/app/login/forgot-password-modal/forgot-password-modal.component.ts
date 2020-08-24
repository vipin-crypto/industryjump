import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {CommonService} from '../../services/common/common.service';
import {Resp} from '../../models/Resp';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {
  flags = {
    isSubmit: false
  };


  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
  }
  submit(form) {
    this.flags.isSubmit = true;
    this.api.forgotPassword(form.value).subscribe((response: Resp) => {
      this.flags.isSubmit = false;
      if (!response.success) return;
      this.common.successToast(response.message);
      document.getElementById('closeForgotModal').click();
    }, error => {
      this.flags.isSubmit = false;
    });
  }

}
