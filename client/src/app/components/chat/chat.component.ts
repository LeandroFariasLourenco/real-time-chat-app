import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMessage, IUser } from 'lib';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>

  @Input() public messages: IMessage[] = [];

  @Input() public user: IUser = {} as IUser;

  @Output() private handleSubmit: EventEmitter<{
    timestamp: string,
    content: string,
  }> = new EventEmitter<{
    timestamp: string,
    content: string,
  }>();

  public chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required])
  });
  
  public currentlyTypingUser: IUser | null = null;

  constructor(
    private readonly chatService: ChatService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.onUserTyping();
  }

  public ngAfterViewInit(): void {
    this.chatContainer.nativeElement.style.height = `${this.chatContainer.nativeElement.clientHeight}px`
  }

  public sendMessage(): void {
    const { message } = this.chatForm.value;

    this.handleSubmit.emit({
      timestamp: new Date().toISOString(),
      content: message,
    });
    this.chatForm.reset();
    // this.chatService.sendMessage({
    //   user: this.user,
    //   content: this.chatForm.value.message,
    //   timestamp: new Date().toISOString()
    // });
    // this.chatForm.reset();
    // this.chatService.dispatchUserIsTyping(null);
  }

  private scrollToEnd(): void {
    this.cdr.detectChanges();
    this.chatContainer.nativeElement.scrollTo({
      behavior: 'smooth',
      top: this.chatContainer.nativeElement.scrollHeight,
    });
  }

  public onUserTyping(): void {
    this.chatForm.get('message')!.valueChanges.subscribe((value) => {
      if (!value || value.length < 1) {
        this.chatService.dispatchUserIsTyping(null);
        return;
      };
      this.chatService.dispatchUserIsTyping(this.user);
    });

    this.chatService.onUserIsTyping().subscribe((user) => {
      this.currentlyTypingUser = user;
      this.scrollToEnd();
    });
  }
}
