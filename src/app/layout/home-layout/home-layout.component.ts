import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from 'src/app/message/message.service';
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
    private messageService: MessageService,
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
      if (!decoded || !decoded.can_access_web) {
        this.redirectToLogin();
        return;
      }

      this.user = {
        user_id: decoded.user_id,
        fullname: decoded.fullname,
        role_id: decoded.role_id,
        role_name: decoded.role_name,
      };

      this.loadConversation();
      this.requestPermission();
      this.listen();
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

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          this.userService
            .updateUserDeviceToken(this.user.user_id, currentToken)
            .subscribe((response: any) => {});
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        // console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      if (payload.data) {
        const newMessage = JSON.parse(payload.data?.['message']);
        this.loadConversation();
        if (newMessage.conversation_id == this.conversation.conversation_id) {
          this.messages.push(newMessage);
        }
      }
    });
  }

  openConversationBox() {
    this.loadConversation();
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

  loadConversation() {
    this.messageService
      .findAllConversation(this.conversationOffset, this.conversationLimit)
      .subscribe((response: any) => {
        this.conversations = response.conversations;
        this.unreadMessageCount = response.all_unread_message_count;
      });
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

    this.messageService.sendMessage(form).subscribe(
      (response: any) => {
        this.messages.push(response);
        this.onClosePreviewImage();
      },
      (err: any) => {
        this._snackBar.open('ບໍ່ສາມາດສົ່ງຂໍ້ຄວາມໄດ້', '', { duration: 3000 });
      }
    );
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
    this.messageService
      .findAllConversation(this.conversationOffset, this.conversationLimit)
      .subscribe((response: any) => {
        this.conversations.push(...response.conversations);
      });
  }

  loadMessages() {
    this.messageService
      .findConversationDetail(
        this.conversation.conversation_id,
        this.messageOffset,
        this.messageLimit
      )
      .subscribe((response: any) => {
        for (let message of response.messages) {
          this.messages.unshift(message);
        }
      });
  }
}
