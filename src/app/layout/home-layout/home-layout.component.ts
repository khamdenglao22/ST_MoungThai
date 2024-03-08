import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { UserService } from 'src/app/user/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  opened = true;
  user: any;
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  showDropdownSettingMenu = false;
  unreadMessageCount = 0;
  conversations: Array<any> = [];
  showConversationBox = false;
  showConversationDetailBox = false;
  showDropdownCreditMenu = false;
  showDropdownProduct = false;
  showDropdownStore = false;
  showDropdownPromotion = false;
  showDropdownUser = false;
  showDropdownProductMenu = false;
  showDropdownProvince = false;
  showDropdownWork = false;
  conversation: any;
  messages: Array<any> = [];
  messageToSend = '';
  fileToSend: any;
  shouldPreviewImage = false;
  previewImageUrl = '';
  previewFilename = '';
  conversationOffset = 1;
  conversationLimit = 50;
  messageOffset = 1;
  messageLimit = 20;
  activeLanguageFlag = '';
  activeLanguageCode = '';
  unActiveLanguageFlag = '';
  unActiveLanguageCode = '';
  showDropdownReportMenu = false;
  showDropdownPoint = false;
  showDropdownRewards = false;
  showDropdownTopup = false;
  showDropdownLottoMenu = false;
  showDropdownToUpMenu = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('lo');
    this.translateService.use(localStorage.getItem('lang') || 'lo');
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    if (lang == 'en') {
      this.activeLanguageFlag = 'assets/images/en-icon.svg';
      this.unActiveLanguageFlag = 'assets/images/lo-icon.svg';
    } else {
      this.activeLanguageFlag = 'assets/images/lo-icon.svg';
      this.unActiveLanguageFlag = 'assets/images/en-icon.svg';
      localStorage.setItem('lang', 'lo');
    }

    const token = this.authService.getToken();

    if (!token) {
      this.redirectToLogin();
      return;
    }

    try {
      const decoded = this.authService.decodeToken() as any;
      this.user = {
        user_id: decoded.user_id,
        fullname_la: decoded.fullname_la,
        fullname_en: decoded.fullname_en,
        role_id: decoded.role_id,
        role_name: decoded.role_name,
      };
    } catch (err) {
      this.redirectToLogin();
      return;
    }
  }

  public onBtnChangeLanguageClick() {
    let lang = localStorage.getItem('lang');
    if (lang == 'lo') {
      lang = 'en';
    } else {
      lang = 'lo';
    }

    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  private redirectToLogin() {
    this.router.navigate([this.baseUrl + '/login']);
  }

  openConversationBox() {
    // this.loadConversation();
    this.showConversationBox = !this.showConversationBox;
    if (!this.showConversationBox) {
      this.conversationOffset = 1;
    }
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  logout() {
    this.authService.removeToken();
    this.redirectToLogin();
  }

  formatDate(date: any) {
    return moment.utc(date).fromNow();
  }

  onConversationItemClick(conversation: any) {
    this.conversation = conversation;
    this.showConversationDetailBox = true;
    this.messages = [];
    this.messageOffset = 1;
    this.loadMessages();
  }

  onBackButtonClick() {
    this.showConversationDetailBox = false;
    this.shouldPreviewImage = false;
    this.previewImageUrl = '';
    this.previewFilename = '';
    this.fileToSend = null;
    this.messageToSend = '';
  }

  onBtnSendClick() {
    if (!this.conversation) {
      this._snackBar.open('ບໍ່ສາມາດສົ່ງຂໍ້ຄວາມໄດ້', '', { duration: 3000 });
      return;
    }

    if (!this.messageToSend && !this.fileToSend) {
      this._snackBar.open('ກະລຸນາປ້ອນຂໍ້ຄວາມ ຫຼື ເລືອກໄຟລ', '', {
        duration: 3000,
      });
      return;
    }

    const form = new FormData();

    if (this.messageToSend) {
      form.append('message', this.messageToSend);
    }

    if (this.fileToSend) {
      form.append('file', this.fileToSend);
    }

    form.append('receiver_id', this.conversation.customer_id);


  }

  openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      this.fileToSend = input?.files?.[0];
      this.previewFilename = this.fileToSend.name;

      if (
        ![
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/gif',
          'application/pdf',
        ].includes(this.fileToSend.type)
      ) {
        this._snackBar.open(
          'ຕ້ອງເປັນໄຟລ jpeg, jpg, png, gif, pdf ເທົ່ານັ້ນ',
          '',
          { duration: 3000 }
        );
        return;
      }

      if (
        ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(
          this.fileToSend.type
        )
      ) {
        const reader = new FileReader();
        reader.onload = () => (this.previewImageUrl = reader.result as string);
        reader.readAsDataURL(this.fileToSend);
      }

      this.shouldPreviewImage = true;
    };

    input.click();
  }

  onClosePreviewImage() {
    this.fileToSend = null;
    this.previewImageUrl = '';
    this.shouldPreviewImage = false;
    this.previewFilename = '';
    this.messageToSend = '';
  }

  loadMessageMore() {
    this.messageOffset++;
    this.loadMessages();
  }

  loadMore() {
    this.conversationOffset += 1;

  }

  loadMessages() {

  }
}
