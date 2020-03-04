import { Directive, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective implements OnInit {

  constructor(private element: ElementRef, private render: Renderer2) { }

  @Input() TableOption: any;
  @Input() Support: any;
  @Output() UpdateData: EventEmitter<any> = new EventEmitter();

  DirectiveData: any;
  createElement(element) {
    return this.render.createElement(element);
  }
  createText(text) {
    return this.render.createText(text);
  }
  
  // tslint:disable-next-line:use-life-cycle-interface
  protected ngOnChanges() {
    this.DirectiveData = this.TableOption;
    if (this.DirectiveData.DataCount != '-') {
      new Promise((resolve, reject) => {
        this.render.removeChild(this.element.nativeElement, this.element.nativeElement.childNodes[0]);
        resolve();
      }).then((res) => {
        this.RenderHTML(this.DirectiveData);
      });
    }
  }
  ngOnInit() { 
  }

  RenderHTML(data) {
    // Base Element
    let BaseEle = this.createElement('div'); BaseEle.className = 'paginationMain'
    this.render.appendChild(this.element.nativeElement, BaseEle);

    // First Element
    let Ele1 = this.createElement('div');
    Ele1.className = 'totalCount';
    this.render.appendChild(Ele1, this.createText(`${data.DataCount} Results`));




    // Second Element
    let Ele2 = this.createElement('div');
    Ele2.className = 'Input';
    this.render.appendChild(Ele2, this.createText('Show : '));
    // -- Second child Element
    let Ele2Ch1 = this.createElement('select');
    // -- Second Child child Element
    for (let i = 0; i < 5; i++) {
      let Ele2Ch1Ch1 = this.createElement('option');
      this.render.setAttribute(Ele2Ch1Ch1, 'value', `${((i + 1) * 5)}`);
      this.render.appendChild(Ele2Ch1Ch1, this.createText((i + 1) * 5));
      this.render.appendChild(Ele2Ch1, Ele2Ch1Ch1);
    }

    // **** setting value to select input element
    Ele2Ch1.value = data.params.lmt;
    // **** Adding Event listner for select input element
    Ele2Ch1.addEventListener('input', (event) => {
      const overPages = this.caculatePages(event.target.value, this.DirectiveData.DataCount);
      if (this.DirectiveData.params.page > overPages) {
        this.DirectiveData.params = { lmt: event.target.value, page: overPages };
      } else {
        this.DirectiveData.params = { lmt: event.target.value, page: this.DirectiveData.params.page };
      }
      this.UpdateData.emit(this.DirectiveData);
    });

    this.render.appendChild(Ele2, Ele2Ch1);





    // Third Element
    let Ele3 = this.createElement('div');
    Ele3.className = 'PagesClicks';
    // -- Third Element Child
    // **** total pages
    const totalPages = this.caculatePages(data.params.lmt, data.DataCount);
    const pages = this.pageShow(totalPages, +data.params.page);
    for (let j = 0; j < pages.length + 2; j++) {
      let Ele3Ch1 = this.createElement('span');
      if (j === 0) {
        Ele3Ch1.className = 'glyphicon glyphicon-chevron-left';
      } else if (j === pages.length + 1) {
        Ele3Ch1.className = 'glyphicon glyphicon-chevron-right';
      } else {
        if (pages[j - 1] == 'dt') {
          this.render.appendChild(Ele3Ch1, this.createText('...'));
        } else {
          if (pages[j - 1] == +data.params.page) { Ele3Ch1.className = 'Pagenow'; }
          Ele3Ch1.addEventListener('click', () => {
            this.DirectiveData.params = { lmt: this.DirectiveData.params.lmt, page: pages[j - 1] };
            this.UpdateData.emit(this.DirectiveData);
          });
          this.render.appendChild(Ele3Ch1, this.createText(pages[j - 1]));
        }
      }
      this.render.appendChild(Ele3, Ele3Ch1);
    }




    // Fourth Element
    let Ele4 = this.createElement('div');
    Ele4.className = 'Input';
    this.render.appendChild(Ele4, this.createText('Jump to : '));
    // -- Fourth child Element
    let Ele4Ch1 = this.createElement('select');
    // -- Fourth Child child Element
    for (let i = 1; i <= this.caculatePages(data.params.lmt, data.DataCount); i++) {
      let Ele4Ch1Ch1 = this.createElement('option');
      this.render.setAttribute(Ele4Ch1Ch1, 'value', `${i}`);
      this.render.appendChild(Ele4Ch1Ch1, this.createText(i));
      this.render.appendChild(Ele4Ch1, Ele4Ch1Ch1);
    }

    // **** setting value to select input element
    Ele4Ch1.value = data.params.page;
    // **** Adding Event listner for select input element
    Ele4Ch1.addEventListener('input', (event) => {
      this.DirectiveData.params = { lmt: this.DirectiveData.params.lmt, page: event.target.value };
      this.UpdateData.emit(this.DirectiveData);
    });

    this.render.appendChild(Ele4, Ele4Ch1);




    // Rendering all Elements
    this.render.appendChild(this.element.nativeElement.childNodes[0], Ele1);
    this.render.appendChild(this.element.nativeElement.childNodes[0], Ele2);
    this.render.appendChild(this.element.nativeElement.childNodes[0], Ele3);
    this.render.appendChild(this.element.nativeElement.childNodes[0], Ele4);
  }
  caculatePages(limt, total) {
    const pages = total / +limt;
    if (Number.isInteger(pages)) {
      return pages;
    } else {
      // tslint:disable-next-line:radix
      return parseInt(pages.toString().split('.')[0]) + 1;
    }
  }
  pageShow(total, current) {
    let PA = [];
    if (total <= 8) { for (let a = 1; a <= total; a++) { PA.push(a) } }
    else if (current == 1) { PA = [1, 2, 'dt', total - 1, total]; }
    else if (current == 2) { PA = [1, 2, 3, 'dt', total - 1, total]; }
    else if (current == 3) { PA = [1, 2, 3, 4, 'dt', total - 1, total]; }
    else if (current == 4) { PA = [1, 2, 3, 4, 5, 'dt', total - 1, total]; }
    else if (current == total) { PA = [1, 2, 'dt', total - 1, total]; }
    else if (current == total - 1) { PA = [1, 2, 'dt', total - 2, total - 1, total]; }
    else if (current == total - 2) { PA = [1, 2, 'dt', total - 3, total - 2, total - 1, total]; }
    else if (current == total - 3) { PA = [1, 2, 'dt', total - 4, total - 3, total - 2, total - 1, total]; }
    else if ((current >= 5) && (current <= (total - 4))) { PA = [1, 2, 'dt', current - 1, current, current + 1, 'dt', total - 1, total]; }
    return PA;
  }
}
